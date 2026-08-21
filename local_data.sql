pg_dump: warning: there are circular foreign-key constraints on this table:
pg_dump: detail: ItemBatch
pg_dump: hint: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
pg_dump: hint: Consider using a full dump instead of a --data-only dump to avoid this problem.
--
-- PostgreSQL database dump
--

\restrict 3qshMjlb0zxarFiMufk5b0RSayfECGySguSUfIKvcOAMex6CVZ4OnAktYwQ9wCV

-- Dumped from database version 16.15
-- Dumped by pg_dump version 16.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: FabricType; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."FabricType" VALUES ('41ad6f83-003e-4c78-836d-a53dab5831ba', 'JACQUARD_LAWN', 'Jacquard Lawn', true, '2026-08-19 17:13:54.27', '2026-08-19 17:13:54.27');
INSERT INTO public."FabricType" VALUES ('3475fe7d-0800-49cc-81ec-edfbc2f17b34', 'DOBBY_LAWN', 'Dobby Lawn', true, '2026-08-19 17:13:54.273', '2026-08-19 17:13:54.273');
INSERT INTO public."FabricType" VALUES ('0915f81a-9324-4088-9428-748268f00b7f', 'COTTON', 'Cotton', true, '2026-08-19 17:13:54.274', '2026-08-19 17:13:54.274');
INSERT INTO public."FabricType" VALUES ('b02405b8-fbb5-4f15-8033-e665474be1a3', 'CHIFFON', 'Chiffon', true, '2026-08-19 17:13:54.275', '2026-08-19 17:13:54.275');
INSERT INTO public."FabricType" VALUES ('74130bb3-a597-4829-b694-5786b4e26815', 'JACQUARD_VISCOSE', 'Jacquard Viscose', true, '2026-08-19 17:13:54.275', '2026-08-19 17:13:54.275');
INSERT INTO public."FabricType" VALUES ('382917b1-55cc-4e7d-999d-745f32189a13', 'VISCOSE', 'Viscose', true, '2026-08-19 17:13:54.276', '2026-08-19 17:13:54.276');
INSERT INTO public."FabricType" VALUES ('e779b3e5-3f2f-4ca8-a301-3fd5a390b055', 'SILK', 'Silk', true, '2026-08-19 17:13:54.276', '2026-08-19 17:13:54.276');
INSERT INTO public."FabricType" VALUES ('a17da14d-0538-4e34-995b-8f3d631d993c', 'NET', 'Net', true, '2026-08-19 17:13:54.277', '2026-08-19 17:13:54.277');
INSERT INTO public."FabricType" VALUES ('8a6f53fb-65f5-4f64-ac06-8eab9403f6f0', 'MALAI', 'Malai', true, '2026-08-19 17:13:54.278', '2026-08-19 17:13:54.278');
INSERT INTO public."FabricType" VALUES ('d2653ded-c747-40fc-a6aa-e82c7c91b66a', 'RAW_SILK', 'Raw Silk', true, '2026-08-19 17:13:54.278', '2026-08-19 17:13:54.278');


--
-- Data for Name: Supplier; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Supplier" VALUES ('aab461ab-142f-4c26-a2ae-a0df65359e36', 'ZT', 'ZAMAN TEXTILE', true, '2026-08-19 17:20:19.022', '2026-08-19 17:20:19.022');


--
-- Data for Name: Vendor; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: ItemBatch; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."ItemBatch" VALUES ('2608-ZT-LAWN-T1', 'RAW_FABRIC', 'WAREHOUSE_RAW', 500.000000000000000000000000000000, NULL, NULL, '2026-08-19 16:00:08.799', '2026-08-19 16:00:08.799', 'YARDS', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public."ItemBatch" VALUES ('2608-ZT-MALAI-T2', 'RAW_FABRIC', 'WAREHOUSE_RAW', 200.000000000000000000000000000000, NULL, NULL, '2026-08-19 17:26:31.79', '2026-08-19 17:26:31.79', 'YARDS', 'BLACK', '8a6f53fb-65f5-4f64-ac06-8eab9403f6f0', 220.000000000000000000000000000000, '76453', 'aab461ab-142f-4c26-a2ae-a0df65359e36', '3476', 44000.000000000000000000000000000000);
INSERT INTO public."ItemBatch" VALUES ('2608-ZT-JACQUARD_LAWN-T3', 'RAW_FABRIC', 'WAREHOUSE_RAW', 300.000000000000000000000000000000, NULL, NULL, '2026-08-19 17:27:22.524', '2026-08-19 17:27:22.524', 'METERS', 'ORANGE', '41ad6f83-003e-4c78-836d-a53dab5831ba', 340.000000000000000000000000000000, 'q928379', 'aab461ab-142f-4c26-a2ae-a0df65359e36', '2839', 102000.000000000000000000000000000000);
INSERT INTO public."ItemBatch" VALUES ('2608-ZT-JACQUARD_VISCOSE-T4', 'RAW_FABRIC', 'WAREHOUSE_RAW', 300.000000000000000000000000000000, NULL, NULL, '2026-08-20 13:14:07.483', '2026-08-20 13:14:07.483', 'METERS', 'WHITE', '74130bb3-a597-4829-b694-5786b4e26815', 230.000000000000000000000000000000, '28246', 'aab461ab-142f-4c26-a2ae-a0df65359e36', '23756', 69000.000000000000000000000000000000);
INSERT INTO public."ItemBatch" VALUES ('2608-ZT-MALAI-T5', 'RAW_FABRIC', 'WAREHOUSE_RAW', 4276.000000000000000000000000000000, NULL, NULL, '2026-08-20 13:15:44.112', '2026-08-20 13:15:44.112', 'YARDS', 'ORANGE', '8a6f53fb-65f5-4f64-ac06-8eab9403f6f0', 120.000000000000000000000000000000, '8654', 'aab461ab-142f-4c26-a2ae-a0df65359e36', '8653', 513120.000000000000000000000000000000);


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: VendorLedger; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- PostgreSQL database dump complete
--

\unrestrict 3qshMjlb0zxarFiMufk5b0RSayfECGySguSUfIKvcOAMex6CVZ4OnAktYwQ9wCV

