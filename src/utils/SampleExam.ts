export const sampleExam = {
  duration: 60, // 60 minutes
  questions: [
    {
      id: 1,
      type: "MCQ",
      question: "Which protocol is used for secure communication over the internet?",
      options: [
        { id: 1, text: "HTTP" },
        { id: 2, text: "HTTPS" },
        { id: 3, text: "FTP" },
        { id: 4, text: "SMTP" },
      ],
    },
    {
      id: 2,
      type: "MCQ",
      question: "What does CPU stand for?",
      options: [
        { id: 1, text: "Central Program Unit" },
        { id: 2, text: "Central Processing Unit" },
        { id: 3, text: "Control Processing Unit" },
        { id: 4, text: "Central Protocol Unit" },
      ],
    },
    {
      id: 3,
      type: "MCQ",
      question: "Which of the following is NOT an OOP concept?",
      options: [
        { id: 1, text: "Abstraction" },
        { id: 2, text: "Polymorphism" },
        { id: 3, text: "Encapsulation" },
        { id: 4, text: "Compilation" },
      ],
    },
    {
      id: 4,
      type: "TYPING",
      question: "Explain the difference between GET and POST methods in HTTP.",
      answerMinLength: 20,
      answerMaxLength: 300,
    },
    {
      id: 5,
      type: "MCQ",
      question: "Which data structure uses FIFO (First In First Out)?",
      options: [
        { id: 1, text: "Stack" },
        { id: 2, text: "Queue" },
        { id: 3, text: "Tree" },
        { id: 4, text: "Graph" },
      ],
    },
    {
      id: 6,
      type: "TYPING",
      question: "Write any 3 advantages of using a Database Management System.",
      answerMinLength: 20,
      answerMaxLength: 250,
    },
    {
      id: 7,
      type: "MCQ",
      question: "Which one is a NoSQL database?",
      options: [
        { id: 1, text: "MySQL" },
        { id: 2, text: "PostgreSQL" },
        { id: 3, text: "MongoDB" },
        { id: 4, text: "Oracle" },
      ],
    },
    {
      id: 8,
      type: "MCQ",
      question: "Which of the following is used to style web pages?",
      options: [
        { id: 1, text: "HTML" },
        { id: 2, text: "CSS" },
        { id: 3, text: "JavaScript" },
        { id: 4, text: "SQL" },
      ],
    },
    {
      id: 9,
      type: "TYPING",
      question: "Define Operating System and list two of its main functions.",
      answerMinLength: 15,
      answerMaxLength: 200,
    },
    {
      id: 10,
      type: "MCQ",
      question: "Which one is a version control system?",
      options: [
        { id: 1, text: "Git" },
        { id: 2, text: "Java" },
        { id: 3, text: "Docker" },
        { id: 4, text: "React" },
      ],
    },
  ],
};
