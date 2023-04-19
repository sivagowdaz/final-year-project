const contractABI = require('./blockchain-abi.js')
const {ethers} = require("ethers")
//const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/827285f709cb4c30b4d36901fe07489f`);
const provider = new ethers.providers.JsonRpcProvider(`https://rpc.ankr.com/polygon_mumbai`);

const contractAddress = "0x87F120CF3B27b837a92a6885982609b949f2C138";

const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
)
    
const getStudentAttendanceDetail = async (subject_id, student_id) => {
    const record = await contract.getStudentAttendanceDetail(subject_id, student_id);
    return record;
}

const getStudentAttendancePercentage = async (subject_id, student_id) => {
    const percentage = await contract.getAttendancePercentage(subject_id, student_id);
    return percentage;
}


const uploadStudentAttendance = async (attendance_data) => {
    try {
        
        let privateKey = '0x632365416d69a46ec67dc0eea7ccd343ee133864f665f0858cb2b849f389de5e';
        let wallet = new ethers.Wallet(privateKey, provider);
        let contractWithSigner = contract.connect(wallet);
    
        // let tx = await contractWithSigner.uploadAttendance([{ "subject_id": "1111", "student_id": "2222", "status": false, "remark": "don't know the reason", "date": "10/05/2023", "timestamp": "9:45:10" }]);
        let tx = await contractWithSigner.uploadAttendance(attendance_data);
        console.log("the hash is ", tx.hash);
    
        let msg = await tx.wait();
        return {status:200}
    } catch(err) {
        console.log('ERROR', err)
        return {status:400}
    }
}

module.exports = {
    getStudentAttendanceDetail,
    getStudentAttendancePercentage,
    uploadStudentAttendance
}