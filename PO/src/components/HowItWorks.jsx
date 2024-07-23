import React from 'react';

const HowItWorks = () => {
  return (
    <section className="w-full py-16 px-8 bg-dark-blue">
      <div className="container mx-auto">
        <h2 className="text-4xl font-semibold text-white text-center mb-12">How It Works</h2>
        <div className="flex flex-col gap-16">
          {/* Step 1 */}
          <div className="flex items-start gap-6 relative">
            <div className="w-12 h-12 flex items-center justify-center bg-secondary text-white rounded-full text-2xl font-semibold">
              1
            </div>
            <div className="text-white flex-grow bg-secondary p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[150px] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Upload Your PDF</h3>
                <p>
                  Start by uploading your bill in PDF format. This allows our system to analyze and process the data.
                </p>
              </div>
            </div>
            <div className="absolute left-[calc(100%+1rem)] top-1/2 w-1 h-full bg-light-purple"></div> {/* Line */}
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-6 relative">
            <div className="w-12 h-12 flex items-center justify-center bg-secondary text-white rounded-full text-2xl font-semibold">
              2
            </div>
            <div className="text-white flex-grow bg-secondary p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[150px] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">AI Extracts Data</h3>
                <p>
                  Our AI will extract relevant data from your uploaded PDF, converting it into a structured format.
                </p>
              </div>
            </div>
            <div className="absolute left-[calc(100%+1rem)] top-1/2 w-1 h-full bg-light-purple"></div> {/* Line */}
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-6 relative">
            <div className="w-12 h-12 flex items-center justify-center bg-secondary text-white rounded-full text-2xl font-semibold">
              3
            </div>
            <div className="text-white flex-grow bg-secondary p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[150px] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Convert to SQL Query</h3>
                <p>
                  The extracted data is then converted into an SQL query, tailored to your database requirements.
                </p>
              </div>
            </div>
            <div className="absolute left-[calc(100%+1rem)] top-1/2 w-1 h-full bg-light-purple"></div> {/* Line */}
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 flex items-center justify-center bg-secondary text-white rounded-full text-2xl font-semibold">
              4
            </div>
            <div className="text-white flex-grow bg-secondary p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[150px] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Update Your Database</h3>
                <p>
                  Finally, the SQL query is executed to update your database with the new information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
