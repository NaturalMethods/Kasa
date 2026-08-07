import db from "@/utils/database";


export function getUserChats(userId: number) {
    return db.prepare(`
        SELECT
            m.id,
            m.text,
            m.expediteur AS senderId,
            m.receveur AS receiverId,
            m.date,
            CASE
                WHEN m.expediteur = ? THEN m.receveur
                ELSE m.expediteur
                END AS correspondantId
        FROM messages m
        WHERE m.id IN (
            SELECT MAX(id)
            FROM messages
            WHERE expediteur = ?
               OR receveur = ?
            GROUP BY
                CASE
                    WHEN expediteur = ? THEN receveur
                    ELSE expediteur
                    END
        )
        ORDER BY date DESC
    `).all(
        userId,
        userId,
        userId,
        userId
    );
}

export function getMessagesForConversations(
    userId: number,
    correspondentId: number
) {

    return db.prepare(`
        SELECT
            id,
            text,
            expediteur AS senderId,
            receveur AS receiverId,
            date
        FROM messages
        WHERE
            (expediteur = ? AND receveur = ?)
           OR
            (expediteur = ? AND receveur = ?)
        ORDER BY date ASC
    `).all(
        userId,
        correspondentId,
        correspondentId,
        userId
    );
}



export function createMessage({
                                  text,
                                  senderId,
                                  receiverId,
                              }: {
    text: string;
    senderId: number;
    receiverId: number;
}) {

    return db.prepare(`
        INSERT INTO messages (
            text,
            expediteur,
            receveur,
            date
        )
        VALUES (?, ?, ?, datetime('now'))
    `).run(
        text,
        senderId,
        receiverId
    );
}