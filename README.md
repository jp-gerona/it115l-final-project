> [!NOTE]  
> This project is for educational purposes only, serving as our group's final requirement in IT115-L. All assets used belong to their respective owners.

<div align="center">

![Preview](/public/images/1.png)

![Oracle Express](https://img.shields.io/badge/Oracle_XE_21C-F80000?style=for-the-badge&logo=Oracle&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite Express](https://img.shields.io/badge/Vite_Express-000000?style=for-the-badge&logo=vite&logoColor=FFD62E)
![ShadCN UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

## Summary

The CCIS Week 2024 Database is a web application management system that handles the processing of the CCIS students records celebrating the college's week of 2024. It is complete with CRUD functionalities for managing student attendance, student list, and player list.

## Features

- **React**: It is the framework for building the user interface, React offers a component-based architecture, enabling the development of reusable and dynamic UI components.

- **Recharts**: Utilized for creating responsive and customizable data visualizations, Recharts allows users to interpret complex data sets through various chart types, making data analysis more intuitive.

- **Tanstack Tables**: Provides flexible, fast, and extensible tables in the React ecosystem. It offers essential features such as sorting, filtering, and pagination, crucial for efficiently managing large datasets within the application.

## Running the Application

The application can only run locally, and is not deployed by any web hosting service. If you want to set-up this project in your local machine, follow these steps (You must have Oracle Express 21c and Oracle Instant Client installed).

- Set-up Oracle Express with the necessary tables. You can check the [Google Docs link] for the SQL Statements.

- Populate all the tables.

- Clone the repository

- In your terminal, install the necessary dependencies by running `npm install`

- Update the db.js dbCredentials placeholders with your Oracle XE credentials.

```js
export const dbCredentials = {
  user: "USER",
  password: "PASSWORD",
  connectionString: "localhost/XEPDB1",
};
```

- Run the application in development mode using `npm run dev` or

- Run the application in build mode using `npm run build`

- Vite will provide a URL in the terminal to your local server: http://localhost:3000

[Google Docs link]: https://docs.google.com/document/d/1ZjIfTv65wzCPqB8erhqA1m55tcDJQneTPwKzp32_D2U/edit?usp=sharing

## Additional Screenshots

<div align="center">

**ERD**

![ERD](/public/images/erd.png)

**Login**

![login](/public/images/login.png)

**Dashboard**

![1](/public/images/1.png)

**Attendance**

![2](/public/images/2.png)

**Events**

![3](/public/images/3.png)

**Roster**

![4](/public/images/4.png)

**Players**

![5](/public/images/5.png)

</div>
