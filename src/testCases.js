export const testCases = [
  {
    description: "Submit valid booking form",
    input: "All fields filled",
    expectedOutput: "Confirmation page with summary shown"
  },
  {
    description: "Submit booking form with missing name",
    input: "Email and phone filled, name empty",
    expectedOutput: "Error message prompting to fill all fields"
  },
  {
    description: "Select 45 or 60 minute duration",
    input: "Duration set to 45 or 60, all fields filled",
    expectedOutput: "Confirmation page shows 'Payment Successful' message"
  },
  {
    description: "Access confirmation page without booking",
    input: "Direct navigation to /confirm with no booking data",
    expectedOutput: "No booking found message and option to book"
  },
  {
    description: "Admin dashboard loads",
    input: "Navigate to /admin",
    expectedOutput: "Lawyer Dashboard page with mock message displayed"
  }
]; 