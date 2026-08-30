import { pool } from "../config/database";

const initDb = async () => {
  console.log("Initializing PostgreSQL database tables...");
  
  const createEventsQuery = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        event_type VARCHAR(100) NOT NULL,
        description TEXT,
        location VARCHAR(255) NOT NULL,
        start_date TIMESTAMP WITH TIME ZONE NOT NULL,
        end_date TIMESTAMP WITH TIME ZONE,
        registration_link VARCHAR(500),
        accent_color VARCHAR(30) DEFAULT '#0068b5',
        is_archived BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createApplicationsQuery = `
    CREATE TABLE IF NOT EXISTS membership_applications (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        enrollment_number VARCHAR(50),
        year_of_study INT NOT NULL,
        department VARCHAR(100) NOT NULL,
        interests TEXT[] NOT NULL,
        github_url VARCHAR(500),
        linkedin_url VARCHAR(500),
        statement_of_purpose TEXT,
        status VARCHAR(30) DEFAULT 'PENDING',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_applications_status ON membership_applications(status, created_at DESC);
  `;

  try {
    console.log("Creating 'events' table...");
    await pool.query(createEventsQuery);
    console.log("✓ 'events' table ready.");

    console.log("Creating 'membership_applications' table...");
    await pool.query(createApplicationsQuery);
    console.log("✓ 'membership_applications' table ready.");
    
    console.log("Database initialization completed successfully! 🎉");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

initDb();
