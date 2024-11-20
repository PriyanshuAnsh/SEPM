CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    guardian_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(15),
    dob DATE,
    address TEXT,
    qualification VARCHAR(50),
    cet_score INT,
    cet_scorecard LONGBLOB,
    aadhaar_card LONGBLOB
);
show tables;
use admission_portal;

select * from applications;
