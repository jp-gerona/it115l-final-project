import OracleDB from "oracledb";

// Function to establish connection to the database
// Change user and password to your OracleDB credentials
export const dbCredentials = {
  user: "CCIS",
  password: "admin",
  connectionString: "localhost/XEPDB1",
};

export async function openConnection() {
  let connection;
  try {
    connection = await OracleDB.getConnection(dbCredentials);
    console.log("Successfully connected to OracleDB");
    return connection;
  } catch (err) {
    console.error("Error connecting to OracleDB:", err);
    throw err;
  }
}

// Function to close the database connection
export async function closeConnection(connection) {
  if (connection) {
    try {
      await connection.close();
      console.log("Connection closed");
    } catch (err) {
      console.error("Error closing connection:", err);
    }
  }
}
