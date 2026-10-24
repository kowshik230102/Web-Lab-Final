import { DatabaseSync } from 'node:sqlite';
import bcrypt from 'bcryptjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new DatabaseSync(path.join(__dirname, '../playverse.db'));
db.exec('PRAGMA foreign_keys = ON');
db.exec(`CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, slug TEXT NOT NULL UNIQUE, description TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY, title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, description TEXT NOT NULL, category_id INTEGER NOT NULL, thumbnail TEXT, game_source TEXT, game_type TEXT NOT NULL DEFAULT 'demo', is_featured INTEGER NOT NULL DEFAULT 0, is_published INTEGER NOT NULL DEFAULT 1, plays INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(category_id) REFERENCES categories(id));
CREATE TABLE IF NOT EXISTS admin_users (id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);`);
const categories = [
 ['Puzzle','puzzle','Think, match, and solve your way to a new high score.'], ['Action','action','Fast reflexes and thrilling challenges.'], ['Racing','racing','Feel the speed in every run.'], ['Arcade','arcade','Quick, classic fun with modern energy.'], ['Adventure','adventure','Explore strange worlds and bold quests.'], ['Brain Training','brain-training','Sharpen your focus one game at a time.']
];
const insertCategory = db.prepare('INSERT OR IGNORE INTO categories (name,slug,description) VALUES (?,?,?)'); categories.forEach(c => insertCategory.run(...c));
const idFor = slug => db.prepare('SELECT id FROM categories WHERE slug=?').get(slug).id;
const games = [
 ['Neon Snake','neon-snake','Guide a glowing serpent, collect energy orbs, and keep clear of your own trail.','arcade','','snake',1,1,3280],
 ['Memory Matrix','memory-matrix','Flip the cards and match every futuristic symbol in the fewest moves.','puzzle','','memory',1,1,2410],
 ['Grid Masters','grid-masters','Claim the grid against a clever local opponent in this timeless strategy duel.','brain-training','','tictactoe',1,1,1940],
 ['Turbo Drift','turbo-drift','An original demo card ready for your future arcade racing game.','racing','','external',0,1,1120],
 ['Skyline Quest','skyline-quest','A colorful adventure awaiting its next chapter.','adventure','','external',0,1,845],
 ['Pulse Runner','pulse-runner','Sprint through a neon obstacle course.','action','','external',0,1,764],
 ['Orbital Logic','orbital-logic','Find patterns in a beautiful galaxy of puzzles.','puzzle','','external',0,1,689],
 ['Pixel Blitz','pixel-blitz','A bite-sized arcade challenge for a quick break.','arcade','','external',0,1,602]
];
const insertGame = db.prepare('INSERT OR IGNORE INTO games (title,slug,description,category_id,game_source,game_type,is_featured,is_published,plays) VALUES (?,?,?,?,?,?,?,?,?)'); games.forEach(g=>insertGame.run(g[0],g[1],g[2],idFor(g[3]),g[4],g[5],g[6],g[7],g[8]));
const username = process.env.ADMIN_USERNAME || 'admin'; const password = process.env.ADMIN_PASSWORD || 'PlayVerseAdmin!2026';
if (!db.prepare('SELECT id FROM admin_users WHERE username=?').get(username)) db.prepare('INSERT INTO admin_users (username,password_hash) VALUES (?,?)').run(username,bcrypt.hashSync(password,12));
export default db;
