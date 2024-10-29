CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Category" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Todo" (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    categoryId INT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    isCompleted BOOLEAN DEFAULT false,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    dueDate TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (userId) REFERENCES "User"(id) ON DELETE CASCADE,
    FOREIGN KEY (categoryId) REFERENCES "Category"(id) ON DELETE SET NULL
);

INSERT INTO "User" (username, email, password)
VALUES ('alice', 'alice@example.com', 'hashed_password_1'),
       ('bob', 'bob@example.com', 'hashed_password_2');

INSERT INTO "Category" (name, description, userId)
VALUES ('Work', 'Tasks related to work', 1),
       ('Personal', 'Personal tasks', 1),
       ('Errands', 'Tasks for errands', 2);

INSERT INTO "Todo" (userId, categoryId, title, description, isCompleted, dueDate)
VALUES (1, 1, 'Complete report', 'Finish the monthly report for the meeting', false, '2024-12-01'),
       (1, 2, 'Buy groceries', 'Milk, Bread, Butter', false, '2024-11-10'),
       (2, 3, 'Pick up laundry', 'Pickup laundry from the dry cleaners', true, '2024-11-05');
