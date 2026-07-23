-- SQL Migration: Create Membership Applications Table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS membership_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    enrollment_number VARCHAR(50),
    year_of_study INT NOT NULL,
    department VARCHAR(100) NOT NULL,
    interests TEXT[] NOT NULL, -- e.g. ARRAY['AI/ML', 'Web Development', 'Robotics']
    github_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    statement_of_purpose TEXT,
    status VARCHAR(30) DEFAULT 'PENDING', -- 'PENDING', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for searching and filtering applications by status & date
CREATE INDEX IF NOT EXISTS idx_applications_status ON membership_applications(status, created_at DESC);
