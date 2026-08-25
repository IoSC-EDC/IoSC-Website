"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModel = void 0;
const database_1 = require("../config/database");
class ApplicationModel {
    static async findAll(statusFilter) {
        let query = "SELECT * FROM membership_applications";
        const values = [];
        if (statusFilter) {
            query += " WHERE status = $1";
            values.push(statusFilter);
        }
        query += " ORDER BY created_at DESC";
        const { rows } = await database_1.pool.query(query, values);
        return rows;
    }
    static async findById(id) {
        const query = "SELECT * FROM membership_applications WHERE id = $1";
        const { rows } = await database_1.pool.query(query, [id]);
        return rows[0] || null;
    }
    static async findByEmail(email) {
        const query = "SELECT * FROM membership_applications WHERE email = $1";
        const { rows } = await database_1.pool.query(query, [email]);
        return rows[0] || null;
    }
    static async create(data) {
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
        const { rows } = await database_1.pool.query(query, values);
        return rows[0];
    }
    static async updateStatus(id, status) {
        const query = `
      UPDATE membership_applications
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *;
    `;
        const { rows } = await database_1.pool.query(query, [status, id]);
        return rows[0] || null;
    }
    static async delete(id) {
        const query = "DELETE FROM membership_applications WHERE id = $1 RETURNING id";
        const { rows } = await database_1.pool.query(query, [id]);
        return rows.length > 0;
    }
}
exports.ApplicationModel = ApplicationModel;
