CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- UUID生成のための拡張機能を有効化

CREATE TABLE IF NOT EXISTS player_master (
  id UUID primary key DEFAULT gen_random_uuid(),
  footballapi_player_id VARCHAR(50) NOT NULL,
  footballapi_team_id VARCHAR(50) NOT NULL,
  player_name VARCHAR(50) NOT NULL,
  team_auth0_user_id VARCHAR(50) NOT NULL,
  birth_date TIMESTAMP NOT NULL,
  nationality VARCHAR(255) NOT NULL,
  height VARCHAR(50),
  weight VARCHAR(50),
  created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_user VARCHAR(255) NOT NULL,
  updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_user VARCHAR(255) NOT NULL
);

INSERT INTO player_master (
    footballapi_player_id, footballapi_team_id, player_name, team_auth0_user_id, birth_date, nationality, height, weight, created_date, created_user, updated_date, updated_user
) VALUES
('1100', '50', 'E. Haaland', 'auth0|6697013cc2e1d8629771a322', '2000-07-21 00:00:00', 'Norway', '194 cm', '88 kg', '2024-06-27 01:59:11.611783', 'yuha', '2024-06-27 01:59:11.611783', 'yuha'),
('1257', '529', 'J. Koundé', 'auth0|661f34d9a04e9fcc19389434', '1998-11-12 00:00:00', 'France', '180 cm', '75 kg', '2024-06-27 01:59:07.619246', 'yuha', '2024-06-27 01:59:07.619246', 'yuha'),
('184', '157', 'H. Kane', 'auth0|661f34d9a04e9fcc19389434', '1993-07-28 00:00:00', 'England', '188 cm', '86 kg', '2024-06-27 01:59:10.138285', 'yuha', '2024-06-27 01:59:10.138285', 'yuha'),
('874', '2939', 'Cristiano Ronaldo', 'auth0|66970618aae4c728f8b9a01e', '1985-02-05 00:00:00', 'Portugal', '187 cm', '83 kg', '2024-06-27 01:59:15.983221', 'yuha', '2024-06-27 01:59:15.983221', 'yuha'),
('762', '541', 'Vinícius Júnior', 'auth0|66970618aae4c728f8b9a01e', '2000-07-12 00:00:00', 'Brazil', '176 cm', '73 kg', '2024-06-27 01:59:08.662281', 'yuha', '2024-06-27 01:59:08.662281', 'yuha'),
('284322', '33', 'K. Mainoo', 'auth0|6697013cc2e1d8629771a322', '2005-04-19 00:00:00', 'England', '175 cm', '72 kg', '2024-06-27 01:59:10.956677', 'yuha', '2024-06-27 01:59:10.956677', 'yuha'),
('2207', '541', 'E. Camavinga', 'auth0|66970618aae4c728f8b9a01e', '2002-11-10 00:00:00', 'France', '182 cm', '68 kg', '2024-06-27 01:59:09.35777', 'yuha', '2024-06-27 01:59:09.35777', 'yuha'),
('2597', '42', 'T. Tomiyasu', 'auth0|6697013cc2e1d8629771a322', '1998-11-05 00:00:00', 'Japan', '187 cm', '84 kg', '2024-06-27 01:59:13.305159', 'yuha', '2024-06-27 01:59:13.305159', 'yuha'),
('19545', '49', 'R. James', 'auth0|66970618aae4c728f8b9a01e', '1999-12-08 00:00:00', 'England', '182 cm', '82 kg', '2024-06-27 01:59:14.044834', 'yuha', '2024-06-27 01:59:14.044834', 'yuha');

CREATE TABLE squad (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL,
  player_id UUID NOT NULL,
  created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_user VARCHAR(255) NOT NULL,
  updated_user VARCHAR(255) NOT NULL
);

INSERT INTO squad (
  team_id, player_id, created_date, updated_date, created_user, updated_user
) VALUES
('0c882c78-c65a-4424-b45e-a7ac4760dfe4', '92cede63-0ea7-42d2-93ff-0d2a9df5e1d6', '2024-09-22 02:09:52.851', '2024-09-22 02:09:52.851', 'auth0|6697013cc2e1d8629771a322', 'auth0|6697013cc2e1d8629771a322'),
('0c882c78-c65a-4424-b45e-a7ac4760dfe4', 'c38159e7-8b04-456e-b03a-166ecf909250', '2024-09-22 02:09:52.851', '2024-09-22 02:09:52.851', 'auth0|6697013cc2e1d8629771a322', 'auth0|6697013cc2e1d8629771a322'),
('0c882c78-c65a-4424-b45e-a7ac4760dfe4', '8f400ead-93a7-4d8b-ac3a-aab25b85c576', '2024-09-22 02:09:52.851', '2024-09-22 02:09:52.851', 'auth0|6697013cc2e1d8629771a322', 'auth0|6697013cc2e1d8629771a322'),
('87bed1b6-5deb-4749-a957-9019592f21f0', '8dc88805-25bc-4524-944f-f9ab5837183b', '2024-07-20 02:42:59.424', '2024-07-20 02:42:59.424', 'auth0|667be856d68b836ad84f852b', 'auth0|667be856d68b836ad84f852b'),
('87bed1b6-5deb-4749-a957-9019592f21f0', '578fc93c-6b06-4c31-9185-6f3012a707b0', '2024-07-20 02:42:59.424', '2024-07-20 02:42:59.424', 'auth0|667be856d68b836ad84f852b', 'auth0|667be856d68b836ad84f852b'),
('82ce11c0-7762-4f82-a7c8-d19c9be1c26a', 'dc8690c0-0d7f-4f08-b4fe-bd353c64631f', '2024-07-17 00:36:00.977', '2024-07-17 00:36:00.977', 'auth0|661f34d9a04e9fcc19389434', 'auth0|661f34d9a04e9fcc19389434'),
('0c882c78-c65a-4424-b45e-a7ac4760dfe4', '07cb0345-3a5c-41dc-b871-cefcd103553c', '2024-09-22 02:09:52.851', '2024-09-22 02:09:52.851', 'auth0|6697013cc2e1d8629771a322', 'auth0|6697013cc2e1d8629771a322'),
('c34f56ba-be8f-4890-a658-2c0d8fe17974', 'bd7062d4-ef39-44cd-b8b2-b6ae1cb5d7c0', '2024-09-22 02:09:50.528', '2024-09-22 02:09:50.528', 'auth0|661f34d9a04e9fcc19389434', 'auth0|661f34d9a04e9fcc19389434');

CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- UUID生成のための拡張機能を有効化

CREATE TABLE TEAMS (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  convention_id UUID NOT NULL,
  team_name VARCHAR(255) NOT NULL,
  manager_name VARCHAR(255) NOT NULL,
  win INTEGER NOT NULL DEFAULT 0,
  draw INTEGER NOT NULL DEFAULT 0,
  lose INTEGER NOT NULL DEFAULT 0,
  totalScore INTEGER NOT NULL DEFAULT 0,
  concededPoints INTEGER NOT NULL DEFAULT 0,
  games INTEGER NOT NULL DEFAULT 0,
  created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_user VARCHAR(255) NOT NULL,
  updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_user VARCHAR(255) NOT NULL,
  auth0_user_id VARCHAR(255) NOT NULL
);

INSERT INTO teams (
    convention_id, team_name, manager_name, win, draw, lose, totalScore, concededPoints, games, created_date, created_user, updated_date, updated_user, auth0_user_id
) VALUES
('532694b9-574d-4161-a5c2-3a929bc765e2', '神ベンチプレス組', '135kgあげる俺', 7, 0, 3, 20, 15, 10, '2023-07-22 02:37:25.506', 'yuha', '2023-07-22 02:37:25.506', 'yuha', 'auth0|667be856d68b836ad84f852b'),
('59640075-d961-4719-a970-1b4843cae38f', 'Dragon Horse Ultimet Stars', 'Monkey D Katogon', 1, 1, 10, 9, 28, 12, '2024-09-22 02:09:50.348', 'yuha', '2024-09-22 02:09:50.348', 'yuha', 'auth0|6697013cc2e1d8629771a322'),
('b06aead5-ed78-4232-bfb0-83d77b9bbff5', 'Server Team', 'Server Manager', 1, 0, 1, 3, 3, 2, '2024-03-15 10:53:02.468', 'yuha', '2024-03-15 10:53:02.468', 'yuha', ''),
('0c1883a4-5c5d-44f0-b16a-9164017e2925', 'PSG(プロテイン・最高・ジェルマン)', 'ルイス・エンリケイセイ', 6, 1, 8, 34, 33, 15, '2023-09-30 02:19:27.387', 'yuha', '2023-09-30 02:19:27.387', 'yuha', 'auth0|667be856d68b836ad84f852b'),
('59640075-d961-4719-a970-1b4843cae38f', 'Bench Press 140 FC', 'Makino 140 Kaisei', 6, 2, 4, 28, 22, 12, '2024-09-22 02:09:50.348', 'yuha', '2024-09-22 02:09:50.348', 'yuha', 'auth0|667be856d68b836ad84f852b'),
('532694b9-574d-4161-a5c2-3a929bc765e2', 'これは僕が最高の夏休みのスタートを切る', '加藤竜馬', 2, 1, 6, 14, 23, 9, '2023-07-22 02:37:25.506', 'yuha', '2023-07-22 02:37:25.506', 'yuha', 'auth0|6697013cc2e1d8629771a322'),
('0c1883a4-5c5d-44f0-b16a-9164017e2925', '名古屋グランパス(極)', 'ツジ・エルナンデス', 6, 2, 7, 33, 25, 15, '2023-09-30 02:19:27.387', 'yuha', '2023-09-30 02:19:27.387', 'yuha', 'auth0|661f34d9a04e9fcc19389434');
