import { Button } from "@material-tailwind/react"

const Biometrics = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 dark:bg-gray-900 dark:text-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Health Report</h1>
              <p className="text-gray-500 dark:text-gray-400">Download your personalized health report</p>
            </div>
            <Button
              as="a"
              href="/health-report.pdf"
              download
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Download PDF
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>John Doe</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Age:</span>
                  <span>35</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Gender:</span>
                  <span>Male</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Height:</span>
                  <span>175 cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Weight:</span>
                  <span>80 kg</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Medical History</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Allergies:</span>
                  <span>Pollen, Dust</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Chronic Conditions:</span>
                  <span>Hypertension</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Medications:</span>
                  <span>Lisinopril, Aspirin</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Surgeries:</span>
                  <span>Appendectomy</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Family History:</span>
                  <span>Diabetes, Heart Disease</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Test Results</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Blood Pressure:</span>
                  <span>120/80 mmHg</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Cholesterol:</span>
                  <span>180 mg/dL</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Blood Sugar:</span>
                  <span>90 mg/dL</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Vitamin D:</span>
                  <span>30 ng/mL</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Hemoglobin A1C:</span>
                  <span>5.7%</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Recommendations</h2>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Diet:</span>
                  <p>Increase intake of fruits, vegetables, and whole grains. Limit processed foods and added sugars.</p>
                </div>
                <div>
                  <span className="font-medium">Exercise:</span>
                  <p>
                    Aim for at least 150 minutes of moderate-intensity exercise per week, such as brisk walking or swimming.
                  </p>
                </div>
                <div>
                  <span className="font-medium">Sleep:</span>
                  <p>Strive for 7-9 hours of quality sleep per night. Establish a consistent sleep routine.</p>
                </div>
                <div>
                  <span className="font-medium">Stress Management:</span>
                  <p>Practice stress-reducing techniques, such as meditation, mindfulness, or yoga.</p>
                </div>
                <div>
                  <span className="font-medium">Follow-up:</span>
                  <p>Schedule a follow-up appointment with your healthcare provider in 6 months.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Blood Pressure</h3>
            <p className="text-2xl">102 / 72 mmhg</p>
            <p className="text-green-600">Normal</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Blood Sugar</h3>
            <p className="text-2xl">80 mg/dL</p>
            <p className="text-green-600">Normal</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Heart Rate</h3>
            <p className="text-2xl">98 bpm</p>
            <p className="text-green-600">Normal</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-2">Intake Goal</h3>
            <p className="text-2xl text-blue-600">18000 ml / 25000 ml</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Biometrics