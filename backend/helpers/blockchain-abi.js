const contractABI = [
  {
    "type": "function",
    "name": "attendanceRecord",
    "inputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "total_classes",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "classes_attended",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "entry_count",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAttendancePercentage",
    "inputs": [
      {
        "type": "string",
        "name": "subject_id",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "student_id",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLeaveRecords",
    "inputs": [
      {
        "type": "string",
        "name": "student_id",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "string",
            "name": "url",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "date",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "timestamp",
            "internalType": "string"
          }
        ],
        "internalType": "struct MyContract.LeaveRecords[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getStudentAttendanceDetail",
    "inputs": [
      {
        "type": "string",
        "name": "subject_id",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "student_id",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "type": "tuple",
        "name": "",
        "components": [
          {
            "type": "uint256",
            "name": "total_classes",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "classes_attended",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "entry_count",
            "internalType": "uint256"
          },
          {
            "type": "tuple[]",
            "name": "student_attendance_data",
            "components": [
              {
                "internalType": "string",
                "name": "date",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "timestamp",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "status",
                "type": "bool"
              },
              {
                "internalType": "string",
                "name": "remark",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "record_id",
                "type": "uint256"
              }
            ],
            "internalType": "struct MyContract.AttendanceData[]"
          }
        ],
        "internalType": "struct MyContract.AttendanceDetail"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "leaveRecordsMap",
    "inputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "string",
        "name": "url",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "date",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "timestamp",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "updateLeaveRecords",
    "inputs": [
      {
        "type": "string",
        "name": "url",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "date",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "timestamp",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "student_id",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateRemark",
    "inputs": [
      {
        "type": "string",
        "name": "subject_id",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "student_id",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "_remark",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "_record_id",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "uploadAttendance",
    "inputs": [
      {
        "type": "tuple[]",
        "name": "_data",
        "components": [
          {
            "type": "string",
            "name": "subject_id",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "student_id",
            "internalType": "string"
          },
          {
            "type": "bool",
            "name": "status",
            "internalType": "bool"
          },
          {
            "type": "string",
            "name": "remark",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "date",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "timestamp",
            "internalType": "string"
          }
        ],
        "internalType": "struct MyContract.uploadAttendanceHelper[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]

module.exports = contractABI;