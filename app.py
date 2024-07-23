from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import mysql.connector
import PyPDF2
import google.generativeai as genai
import imaplib
import email
from email.header import decode_header
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get environment variables
GENAI_API_KEY = os.getenv("GENAI_API_KEY")
IMAP_SERVER = os.getenv("IMAP_SERVER")
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

genai.configure(api_key=GENAI_API_KEY)

app = Flask(__name__)
CORS(app)

def db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="pass1",
        database="demo"
    )
    return connection

def extract_text_from_pdf(purchaseOrder):
    reader = PyPDF2.PdfReader(purchaseOrder)
    text = ''
    for page_num in range(len(reader.pages)):
        page = reader.pages[page_num]
        text += page.extract_text()
    return text

def get_gemini_response(prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text.strip()

def execute_sql_commands(sql_commands):
    conn = db_connection()
    cursor = conn.cursor()
    try:
        commands = sql_commands.replace('```sql', '').replace('```', '').strip().split(';')
        for command in commands:
            if command.strip() != "":
                cursor.execute(command + ';')
    except mysql.connector.Error as e:
        return f"MySQL error: {e}", None
    conn.commit()
    conn.close()
    return None

def fetch_unread_emails():
    
    mail = imaplib.IMAP4_SSL(IMAP_SERVER)
    mail.login(EMAIL_USER, EMAIL_PASS)
    mail.select("inbox")

    result, data = mail.search(None, '(UNSEEN)')
    email_ids = data[0].split()
    emails = []

    for email_id in email_ids:
        result, message_data = mail.fetch(email_id, '(RFC822)')
        raw_email = message_data[0][1]
        msg = email.message_from_bytes(raw_email)
        subject, encoding = decode_header(msg["Subject"])[0]
        if isinstance(subject, bytes):
            subject = subject.decode(encoding if encoding else "utf-8")
        from_ = msg.get("From")
        body = ''
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == 'text/plain':
                    body += part.get_payload(decode=True).decode()
        else:
            body += msg.get_payload(decode=True).decode()
        emails.append({"subject": subject, "from": from_, "body": body})

    mail.logout()
    return emails

@app.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    text = extract_text_from_pdf(file)
    
    prompt = f"""
    You are an expert in converting English text to SQL INSERT queries!
    The SQL database has the table 'Purchases' with the following columns:
    invoice_number VARCHAR(255),
    buy_date VARCHAR(255),
    due_date VARCHAR(255),
    product_name VARCHAR(255),
    qty INT,
    price DECIMAL(10, 2)
    if dates are like 23 july 2024 change it to 2024-07-23
    give call command for stored procedure like below
    CALL InsertPurchase('INV123', '2024-07-21', '2024-08-21', 'Product A', 100, 29.99);
    """
    prompt += f"\n{text}"
    sql = get_gemini_response(prompt)
    print("Generated SQL:")
    print(sql)
    
    error = execute_sql_commands(sql)
    
    if error:
        return jsonify({'error': error}), 500

    return jsonify({'message': 'Data successfully added'})

@app.route('/fetch-purchases', methods=['GET'])
def fetch_data():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Purchases ORDER BY buy_date DESC")  # Query to fetch all data
    rows = cursor.fetchall()
    conn.close()
    return jsonify({'result': rows})

@app.route('/fetch-sales', methods=['GET'])
def fetch_sales():
    conn=db_connection()
    cursor=conn.cursor()
    cursor.execute("SELECT * FROM Sales ORDER BY sale_date DESC")
    rows=cursor.fetchall()
    conn.close()
    return jsonify({'result': rows})

@app.route('/fetch-inventory', methods=['GET'])
def fetch_inventory():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Inventory")
    rows = cursor.fetchall()
    conn.close()
    return jsonify({'result': rows})

@app.route('/process-emails', methods=['GET'])
def process_emails():
    emails = fetch_unread_emails()
    email_texts = "\n\n".join([f"From: {email['from']}\nSubject: {email['subject']}\nBody: {email['body']}" for email in emails])
    
    prompt = f"""
    You are an expert in transforming the following email data into a structured format:
    Extract the following fields where available:
    - Sender's Email
    - Name
    - Product Name
    - Quantity
    - Price of product
    - Remarks (any additional information like total,dates, contact info, etc.)

    If a field is not present, skip it.

    Here is an example format:
    Sender's Email: example@example.com
    Name: John Doe
    Product Name: Widget, Quantity: 10
    Price of product : 100
    Remarks: Needed by end of month

    dont include this on top **Email**
    Transform the following email data into the above format: 
    

    {email_texts}
    """
    
    processed_data = get_gemini_response(prompt).split('\n\n')
    return jsonify({'processed_data': processed_data})

@app.route('/sales-deduction', methods=['POST'])
def sales_deduction():
    # Use the processed data from the last fetch
    processed_data = request.json.get('processed_data', '')
    if not processed_data:
        return jsonify({'error': 'No processed data provided'}), 400
    
    prompt = f"""
    You are an expert in converting English text to SQL INSERT queries!
    The SQL database has the table 'Sales' with the following columns:
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255),
    qty INT,
    price DECIMAL(10, 2),
    total_price DECIMAL(10, 2),
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_name) REFERENCES Inventory(product_name)
    """
    prompt += f"\n{processed_data}"
    sql = get_gemini_response(prompt)
    print("Generated SQL:")
    print(sql)
    error = execute_sql_commands(sql)
    print(processed_data)
    print(error)
    if error:
        return jsonify({'error': error}), 500

    return jsonify({'message': 'Data successfully added'})



@app.route('/upload-sales-pdf', methods=['POST'])
def upload_sales_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    text = extract_text_from_pdf(file)
    
    prompt = f"""
    You are an expert in converting English text to SQL INSERT queries!
    The SQL database has the table 'Sales' with the following columns:
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255),
    qty INT,
    price DECIMAL(10, 2),
    total_price DECIMAL(10, 2),
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_name) REFERENCES Inventory(product_name)
    """
    prompt += f"\n{text}"
    sql = get_gemini_response(prompt)
    print("Generated SQL:")
    print(sql)
    
    error = execute_sql_commands(sql)
    
    if error:
        return jsonify({'error': error}), 500

    return jsonify({'message': 'Data successfully added'})



@app.route('/total-sales', methods=['GET'])
def total_sales():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT SUM(total_price) as total FROM Sales")
    total = cursor.fetchone()[0] or 0
    conn.close()
    return jsonify({'total': total})

@app.route('/total-purchases', methods=['GET'])
def total_purchases():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT SUM(price * qty) as total FROM Purchases")
    total = cursor.fetchone()[0] or 0
    conn.close()
    return jsonify({'total': total})

@app.route('/inventory', methods=['GET'])
def get_inventory():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Inventory")
    rows = cursor.fetchall()
    conn.close()
    return jsonify({'result': [dict(zip([desc[0] for desc in cursor.description], row)) for row in rows]})

@app.route('/sales', methods=['GET'])
def get_sales():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Sales")
    rows = cursor.fetchall()
    conn.close()
    return jsonify({'result': [dict(zip([desc[0] for desc in cursor.description], row)) for row in rows]})

@app.route('/purchases', methods=['GET'])
def get_purchases():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Purchases")
    rows = cursor.fetchall()
    conn.close()
    return jsonify({'result': [dict(zip([desc[0] for desc in cursor.description], row)) for row in rows]})



# Retrieve query from DB
def read_sql(sql):
    connection = db_connection()
    cursor = connection.cursor()
    sql_query = sql.replace('```sql', '').replace('```', '').strip()

    try:
        cursor.execute(sql_query)
        rows = cursor.fetchall()
        connection.commit()
        return rows, sql_query
    except mysql.connector.Error as e:
        print(f"MySQL Error: {e}")
        return [], sql_query
    finally:
        connection.close()

# Get SQL schema
def get_sql_schema():
    connection = db_connection()
    cursor = connection.cursor()
    cursor.execute("SHOW TABLES;")
    tables = cursor.fetchall()
    
    schema = {"tables": {}}
    for table in tables:
        table_name = table[0]
        cursor.execute(f"DESCRIBE {table_name};")
        columns = cursor.fetchall()
        schema["tables"][table_name] = [column[0] for column in columns]
    
    connection.close()
    return schema

# Load SQL schema
sql_schema = get_sql_schema()
with open('sql_schema.json', 'w') as f:
    json.dump(sql_schema, f, indent=4)

# Define prompt
prompt = [f"""
You are an expert in converting English questions to SQL queries!
The SQL database has the following tables and columns: {json.dumps(sql_schema['tables'])}
\n\nFor example,\nExample 1 - How many entries of records are present?,
the SQL command will be something like this: SELECT COUNT(*) FROM TABLE_NAME;
\nExample 2 - Tell me all the students studying in A?,
the SQL command will be something like this: SELECT * FROM TABLE_NAME WHERE COLUMN_NAME="A",
Ensure your responses are detailed and provide valuable insights into the results but dont explain the sql query.
and use descriptive statements while answering.
"""]

def get_gemini_response1(question, prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content([prompt[0], question])
    return response.text


prompt1=""" 
You are a word to sentence converter. Based on the question and the answer rows(data) provided form a nice displayable sentences.
Remove anything other than a comma(,). If the answer(row) have multiple words display it nicely 
"""

def get_detailed_gemini_response(question,prompt1,rows):
    model = genai.GenerativeModel('gemini-pro')
    rows_str = '\n'.join([str(row) for row in rows])
    prompt1+=f"\n{question,rows_str}"  
    response = model.generate_content(prompt1)
    return response.text.strip()


@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question')

    if not question:
        return jsonify({'error': 'Question is required'}), 400

    response = get_gemini_response1(question, prompt)
    rows, sql_query = read_sql(response)

    final=get_detailed_gemini_response(question,prompt1,rows)

    print(response)
    print(sql_query)
    print(rows)
    print(final)
    return jsonify({
        'sql_query': sql_query,
        'sql_response': response,
        'data': final
    })




if __name__ == '__main__':
    app.run(debug=True)

