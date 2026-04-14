CREATE TABLE `contact_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`company` varchar(200),
	`subject` varchar(300),
	`message` text NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`lang` varchar(5) NOT NULL DEFAULT 'en',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ongoing_projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(20) NOT NULL,
	`titleEn` varchar(400) NOT NULL,
	`titleAr` varchar(400) NOT NULL,
	`descEn` text,
	`descAr` text,
	`client` varchar(200),
	`startDate` varchar(20),
	`endDate` varchar(20),
	`completion` int NOT NULL DEFAULT 0,
	`category` varchar(100),
	`remarks` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ongoing_projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `ongoing_projects_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(20) NOT NULL,
	`titleEn` varchar(400) NOT NULL,
	`titleAr` varchar(400) NOT NULL,
	`descEn` text,
	`descAr` text,
	`client` varchar(200),
	`year` varchar(10),
	`category` varchar(100),
	`mediaUrls` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_code_unique` UNIQUE(`code`)
);
