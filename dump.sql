--
-- PostgreSQL database dump
--

-- Dumped from database version 11.12 (Debian 11.12-0+deb10u1)
-- Dumped by pg_dump version 11.12 (Debian 11.12-0+deb10u1)

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

SET default_with_oids = false;

--
-- Name: expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expenses (
    id uuid,
    merchant_name character varying(255),
    amount_in_cents integer,
    currency character varying(10),
    user_id uuid,
    date_created timestamp without time zone,
    status character varying(100)
);


-- ALTER TABLE public.expenses OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid,
    first_name character varying(100),
    last_name character varying(100),
    company_name character varying(255),
    ssn character varying(32)
);


-- ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expenses (id, merchant_name, amount_in_cents, currency, user_id, date_created, status) FROM stdin;
3e920f54-49df-4d0b-b11b-e6f08e3a2dca	Cafe 22	8000	DKK	da140a29-ae80-4f0e-a62d-6c2d2bc8a474	2021-09-21 20:57:40.021428	pending
314d54f4-8a5f-4c1d-b735-426b54794a44	Sliders	12000	DKK	da140a29-ae80-4f0e-a62d-6c2d2bc8a474	2021-09-20 20:57:40.021428	processed
f20866f9-7d46-45f2-822c-4b568e216a13	Donkey Republic	6000	DKK	da140a29-ae80-4f0e-a62d-6c2d2bc8a474	2021-09-19 20:57:40.021428	processed
55987cc7-7830-442a-a52f-ca0326d9d3b1	Cafe 22	4450	DKK	e17825a6-ad80-41bb-a76b-c5ee17b2f29d	2021-09-21 20:57:40.021428	pending
f3f34c29-274a-414d-988f-711802eeac25	BRUS	5000	DKK	3d16547a-79f6-4f62-9034-d3bfb31fb37c	2021-09-18 20:57:40.021428	processed
285a5b8e-fb44-4763-9c71-9bd445b2783a	BRUS	-5000	DKK	3d16547a-79f6-4f62-9034-d3bfb31fb37c	2021-09-18 20:57:40.021428	processed
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, company_name, ssn) FROM stdin;
da140a29-ae80-4f0e-a62d-6c2d2bc8a474	jeppe	rindom	pleo	1
e17825a6-ad80-41bb-a76b-c5ee17b2f29d	petr	janda	pleo	2
3d16547a-79f6-4f62-9034-d3bfb31fb37c	olov	eriksson	pleo	3
\.


--
-- PostgreSQL database dump complete
--

