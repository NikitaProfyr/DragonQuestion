--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

-- Started on 2023-08-15 00:58:08

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

DROP DATABASE "DQDB";
--
-- TOC entry 3322 (class 1262 OID 17178)
-- Name: DQDB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "DQDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';


ALTER DATABASE "DQDB" OWNER TO postgres;

\connect "DQDB"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 17179)
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: dies_admin
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO dies_admin;

--
-- TOC entry 3316 (class 0 OID 17179)
-- Dependencies: 214
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: dies_admin
--

INSERT INTO public.alembic_version (version_num) VALUES ('ee0d73a8650e');


--
-- TOC entry 3173 (class 2606 OID 17183)
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: dies_admin
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


-- Completed on 2023-08-15 00:58:08

--
-- PostgreSQL database dump complete
--

