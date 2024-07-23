import React, { useState } from 'react'
import axios from 'axios'

const EmailFetcher = () => {
  const [emails, setEmails] = useState([])
  const [server, setServer] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [sql, setSql] = useState('')

  const fetchEmails = () => {
    axios.post('http://localhost:5000/fetch-emails', { server, username, password })
      .then(response => {
        setEmails(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the emails!', error)
      })
  }

  const generateSql = (text) => {
    axios.post('http://localhost:5000/generate-sql', { text })
      .then(response => {
        setSql(response.data.sql)
      })
      .catch(error => {
        console.error('There was an error generating the SQL query!', error)
      })
  }

  const executeSql = () => {
    axios.post('http://localhost:5000/execute-sql', { sql })
      .then(response => {
        alert(response.data.result)
      })
      .catch(error => {
        console.error('There was an error executing the SQL query!', error)
      })
  }

  return (
    <div>
      <h1>Email Fetcher</h1>
      <div>
        <input
          type="text"
          placeholder="IMAP Server"
          value={server}
          onChange={e => setServer(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Email Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={fetchEmails}>Fetch Emails</button>
      </div>
      <div>
        <h2>Fetched Emails</h2>
        <ul>
          {emails.map((email, index) => (
            <li key={index}>
              <p><strong>From:</strong> {email.sender}</p>
              <p><strong>Subject:</strong> {email.subject}</p>
              <p><strong>Body:</strong> {email.body}</p>
              <button onClick={() => generateSql(email.body)}>Generate SQL</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Generated SQL</h2>
        <textarea value={sql} readOnly rows="10" cols="80"></textarea>
        <button onClick={executeSql}>Execute SQL</button>
      </div>
    </div>
  )
}

export default EmailFetcher
