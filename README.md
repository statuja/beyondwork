# beyondwork

Hello from Marwah!

hello from elena!

hello from Irina

Hello from Berlin!
:)

{
"companyName": "DCI",
"companyType": "Education",
"numberOfEmployees": "300",
"companyAddress":{
"zipCode": "123456",
"country": "Germany",
"city": "Berlin",
"address": "Dusseldorferdtr. 1"
},
"companyContact": {
"phoneNumber": "+12345678913",
"email": "dcicompany13@gmail.com"
},
"defaultAdminEmail": "admindci13@gmail.com"
}

{
"userFullName": "John Doe",
"userJobTitle": "Web Developer",
"userDepartment": "frontend",
"userCompany": "651e85d1a9e0686d51301349",

    "userContact":
    {
      "phoneNumber": "+987456321",
      "email": "doe@gmail.com"
    },
    "userPassword": "johndoe",
    "adminRole": true

}

{
"userFullName": "Nina Nino",
"userJobTitle": "HR",
"userDepartment": "HR",
"userCompany": "651e85d1a9e0686d51301349",
"userContact":
{
"phoneNumber": "+977334455",
"email": "nina@gmail.com"
},
"userPassword": "ninanono",
"adminRole": true
}

.env file:
PORT = 5000
MONGO_DB_LINK = mongodb+srv://admin:girlspower2023@beyondwork.996i5lj.mongodb.net/beyondwork
SECRET_KEY = who can guess the secret code?

to look at:
try {
const companyId = req.params.userCompany;
const updatedCompanyData = req.body;
const updatedCompany = await Company.findByIdAndUpdate(
companyId,
updatedCompanyData,
{ new: true }
);

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res.json({
      message: "Company information updated successfully",
      updatedCompany,
    });

} catch (error) {
console.error(error);
res.status(500).json({ message: "Server error" });
}
