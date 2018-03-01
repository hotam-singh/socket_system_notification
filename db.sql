/* Create Database/Tables
*
*/

BEGIN;

CREATE DATABASE IF NOT EXISTS "test";

CREATE TABLE IF NOT EXISTS "posts"(
  "username" VARCHAR(20),
  "comment" VARCHAR(50)
);