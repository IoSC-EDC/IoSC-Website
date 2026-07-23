import { pool } from "../config/database";

export interface ApplicationEntity {
  id: string;
  full_name: string;
  email: string;
  enrollment_number: string | null;
  year_of_study: number;
  department: string;
  interests: string[];
  github_url: string | null;
  linkedin_url: string | null;
  statement_of_purpose: string | null;
  status: "PENDING" | "UNDER_REVIEW" | "ACCEPTED" | "REJECTED";
  created_at: Date;
  updated_at: Date;
}

export class ApplicationModel {
  static async findAll(statusFilter?: string): Promise<ApplicationEntity[]> {
    let query = "SELECT * FROM membership_applications";
    const values: any[] = [];

    if (statusFilter) {
      query += " WHERE status = $1";
      values.push(statusFilter);
    }

    query += " ORDER BY created_at DESC";

    const { rows } = await pool.query<ApplicationEntity>(query, values);
    return rows;
  }

  static async findById(id: string): Promise<ApplicationEntity | null> {
    const query = "SELECT * FROM membership_applications WHERE id = $1";
    const { rows } = await pool.query<ApplicationEntity>(query, [id]);
    return rows[0] || null;
  }

  static async findByEmail(email: string): Promise<ApplicationEntity | null> {
    const query = "SELECT * FROM membership_applications WHERE email = $1";
    const { rows } = await pool.query<ApplicationEntity>(query, [email]);
    return rows[0] || null;
  }

  static async create(data: {
    fullName: string;
    email: string;
    enrollmentNumber?: string;
    yearOfStudy: number;
    department: string;
    interests: string[];
    githubUrl?: string;
    linkedinUrl?: string;
    statementOfPurpose?: string;
  }): Promise<ApplicationEntity> {
    const query = `
      INSERT INTO membership_applications 
      (full_name, email, enrollment_number, year_of_study, department, interests, github_url, linkedin_url, statement_of_purpose)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [
      data.fullName,
      data.email,
      data.enrollmentNumber || null,
      data.yearOfStudy,
      data.department,
      data.interests,
      data.githubUrl || null,
      data.linkedinUrl || null,
      data.statementOfPurpose || null,
    ];

    const { rows } = await pool.query<ApplicationEntity>(query, values);
    return rows[0];
  }

  static async updateStatus(id: string, status: string): Promise<ApplicationEntity | null> {
    const query = `
      UPDATE membership_applications
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *;
    `;
    const { rows } = await pool.query<ApplicationEntity>(query, [status, id]);
    return rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM membership_applications WHERE id = $1 RETURNING id";
    const { rows } = await pool.query(query, [id]);
    return rows.length > 0;
  }
}
