"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const database_1 = require("../config/database");
class EventModel {
    static async findAll(filterArchived) {
        let query = "SELECT * FROM events";
        const values = [];
        if (typeof filterArchived === "boolean") {
            query += " WHERE is_archived = $1";
            values.push(filterArchived);
        }
        query += " ORDER BY start_date DESC";
        const { rows } = await database_1.pool.query(query, values);
        return rows;
    }
    static async findById(id) {
        const query = "SELECT * FROM events WHERE id = $1";
        const { rows } = await database_1.pool.query(query, [id]);
        return rows[0] || null;
    }
    static async create(data) {
        const query = `
      INSERT INTO events (title, event_type, description, location, start_date, end_date, registration_link, accent_color, is_archived)
      VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8, '#0068b5'), COALESCE($9, false))
      RETURNING *;
    `;
        const values = [
            data.title,
            data.eventType,
            data.description || null,
            data.location,
            data.startDate,
            data.endDate || null,
            data.registrationLink || null,
            data.accentColor || '#0068b5',
            data.isArchived ?? false,
        ];
        const { rows } = await database_1.pool.query(query, values);
        return rows[0];
    }
    static async update(id, data) {
        const updates = [];
        const values = [];
        let paramIndex = 1;
        if (data.title !== undefined) {
            updates.push(`title = $${paramIndex++}`);
            values.push(data.title);
        }
        if (data.eventType !== undefined) {
            updates.push(`event_type = $${paramIndex++}`);
            values.push(data.eventType);
        }
        if (data.description !== undefined) {
            updates.push(`description = $${paramIndex++}`);
            values.push(data.description);
        }
        if (data.location !== undefined) {
            updates.push(`location = $${paramIndex++}`);
            values.push(data.location);
        }
        if (data.startDate !== undefined) {
            updates.push(`start_date = $${paramIndex++}`);
            values.push(data.startDate);
        }
        if (data.endDate !== undefined) {
            updates.push(`end_date = $${paramIndex++}`);
            values.push(data.endDate);
        }
        if (data.registrationLink !== undefined) {
            updates.push(`registration_link = $${paramIndex++}`);
            values.push(data.registrationLink);
        }
        if (data.accentColor !== undefined) {
            updates.push(`accent_color = $${paramIndex++}`);
            values.push(data.accentColor);
        }
        if (data.isArchived !== undefined) {
            updates.push(`is_archived = $${paramIndex++}`);
            values.push(data.isArchived);
        }
        if (updates.length === 0)
            return this.findById(id);
        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);
        const query = `
      UPDATE events
      SET ${updates.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING *;
    `;
        const { rows } = await database_1.pool.query(query, values);
        return rows[0] || null;
    }
    static async delete(id) {
        const query = "DELETE FROM events WHERE id = $1 RETURNING id";
        const { rows } = await database_1.pool.query(query, [id]);
        return rows.length > 0;
    }
}
exports.EventModel = EventModel;
