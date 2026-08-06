import db from "@/utils/database";

export function getMessages() {
    return db
        .prepare(
            "SELECT * FROM messages ORDER BY date ASC"
        )
        .all();
}


export function createMessage(
    text: string,
    expediteur: number,
    receveur: number
) {

    return db
        .prepare(`
            INSERT INTO messages
            (text, expediteur, receveur)
            VALUES (?, ?, ?)
        `)
        .run(
            text,
            expediteur,
            receveur
        );
}