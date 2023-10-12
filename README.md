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

/\* const companyNameRef = useRef();
const companyTypeRef = useRef();
const numberOfEmpRef = useRef();
const streetRef = useRef();
const cityRef = useRef();
const zipCodeRef = useRef();
const countryRef = useRef();
const phoneRef = useRef();
const companyEmailRef = useRef();
const defaultAdminEmail = useRef();

\*/

Company registration form:

/_ const handleSubmit = (e) => {
e.preventDefault();
const company = {
companyName: companyNameRef.current.value,
companyType: companyTypeRef.current.value,
numberOfEmployees: numberOfEmpRef.current.value,
companyAddress: {
address: streetRef.current.value,
city: cityRef.current.value,
zipCode: zipCodeRef.current.value,
country: countryRef.current.value,
},
companyContact: {
email: companyEmailRef.current.value,
phoneNumber: phoneRef.current.value,
},
defaultAdminEmail: defaultAdminEmail.current.value,
}; _/

      {/*  <form onSubmit={handleSubmit}>
        <label> Company Name:</label>
        <input type="text" ref={companyNameRef} />
        <label> Company type:</label>
        <input type="text" ref={companyTypeRef} />
        <label> Number of Employees</label>
        <select id="empNum" name="empNum" ref={numberOfEmpRef}>
          <option value="lessthan50">Less than 50</option>
          <option value="51to100">51-100</option>
          <option value="101to500">101-500</option>
          <option value="morethan500">More than 500</option>
        </select>
        <label> Company Address:</label>
        <input
          type="text"
          placeholder="Street, Building/Office Number"
          ref={streetRef}
        />
        <input type="text" placeholder="City" ref={cityRef} />
        <input type="text" placeholder="Zip Code" ref={zipCodeRef} />
        <input type="text" placeholder="Country" ref={countryRef} />
        <label>Company Contact Details:</label>
        <input type="text" placeholder="Phone Number" ref={phoneRef} />
        <input
          type="email"
          placeholder="Company E-mail Address"
          ref={companyEmailRef}
        />
        <input
          type="email"
          placeholder="Admin E-mail Address"
          ref={defaultAdminEmail}
        /> */}

createUser:
{
"userFullName": "nina banina",
"userJobTitle": "HR manager",
"userDepartment": "HR",
"userAddress": {
"zipCode": "123456",
"country": "Germany",
"city": "Berlin",
"address": "Dusseldorferdtr. 1"
},
"userContact": {
"email": "ninanina@gmail.com"
},
"userPassword": "nina1234",
"adminRole": "false"
}
