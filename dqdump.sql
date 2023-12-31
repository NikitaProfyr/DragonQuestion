PGDMP                  	    {            DQDB    16.0    16.0 2               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            !           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            "           1262    16418    DQDB    DATABASE     z   CREATE DATABASE "DQDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "DQDB";
                postgres    false            �            1259    16532    Answer    TABLE     �   CREATE TABLE public."Answer" (
    id integer NOT NULL,
    title character varying NOT NULL,
    "right" boolean NOT NULL,
    "questionId" integer
);
    DROP TABLE public."Answer";
       public         heap 
   dies_admin    false            �            1259    16531    Answer_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Answer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Answer_id_seq";
       public       
   dies_admin    false    221            #           0    0    Answer_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Answer_id_seq" OWNED BY public."Answer".id;
          public       
   dies_admin    false    220            �            1259    16541    Question    TABLE     x   CREATE TABLE public."Question" (
    id integer NOT NULL,
    title character varying NOT NULL,
    "quizId" integer
);
    DROP TABLE public."Question";
       public         heap 
   dies_admin    false            �            1259    16540    Question_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Question_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Question_id_seq";
       public       
   dies_admin    false    223            $           0    0    Question_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Question_id_seq" OWNED BY public."Question".id;
          public       
   dies_admin    false    222            �            1259    16555    Quiz    TABLE     �   CREATE TABLE public."Quiz" (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    image character varying,
    "authorId" integer
);
    DROP TABLE public."Quiz";
       public         heap 
   dies_admin    false            �            1259    16554    Quiz_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Quiz_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Quiz_id_seq";
       public       
   dies_admin    false    225            %           0    0    Quiz_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Quiz_id_seq" OWNED BY public."Quiz".id;
          public       
   dies_admin    false    224            �            1259    16514    Token    TABLE     s   CREATE TABLE public."Token" (
    id integer NOT NULL,
    "accesToken" character varying,
    "userId" integer
);
    DROP TABLE public."Token";
       public         heap 
   dies_admin    false            �            1259    16513    Token_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Token_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Token_id_seq";
       public       
   dies_admin    false    219            &           0    0    Token_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Token_id_seq" OWNED BY public."Token".id;
          public       
   dies_admin    false    218            �            1259    16503    User    TABLE     �   CREATE TABLE public."User" (
    id integer NOT NULL,
    email character varying,
    "hashedPassword" character varying,
    "userName" character varying,
    "firstName" character varying,
    "lastName" character varying
);
    DROP TABLE public."User";
       public         heap 
   dies_admin    false            �            1259    16502    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public       
   dies_admin    false    217            '           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public       
   dies_admin    false    216            �            1259    16497    alembic_version    TABLE     X   CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);
 #   DROP TABLE public.alembic_version;
       public         heap 
   dies_admin    false            j           2604    16535 	   Answer id    DEFAULT     j   ALTER TABLE ONLY public."Answer" ALTER COLUMN id SET DEFAULT nextval('public."Answer_id_seq"'::regclass);
 :   ALTER TABLE public."Answer" ALTER COLUMN id DROP DEFAULT;
       public       
   dies_admin    false    221    220    221            k           2604    16544    Question id    DEFAULT     n   ALTER TABLE ONLY public."Question" ALTER COLUMN id SET DEFAULT nextval('public."Question_id_seq"'::regclass);
 <   ALTER TABLE public."Question" ALTER COLUMN id DROP DEFAULT;
       public       
   dies_admin    false    222    223    223            l           2604    16558    Quiz id    DEFAULT     f   ALTER TABLE ONLY public."Quiz" ALTER COLUMN id SET DEFAULT nextval('public."Quiz_id_seq"'::regclass);
 8   ALTER TABLE public."Quiz" ALTER COLUMN id DROP DEFAULT;
       public       
   dies_admin    false    224    225    225            i           2604    16517    Token id    DEFAULT     h   ALTER TABLE ONLY public."Token" ALTER COLUMN id SET DEFAULT nextval('public."Token_id_seq"'::regclass);
 9   ALTER TABLE public."Token" ALTER COLUMN id DROP DEFAULT;
       public       
   dies_admin    false    218    219    219            h           2604    16506    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public       
   dies_admin    false    217    216    217                      0    16532    Answer 
   TABLE DATA           D   COPY public."Answer" (id, title, "right", "questionId") FROM stdin;
    public       
   dies_admin    false    221   6                 0    16541    Question 
   TABLE DATA           9   COPY public."Question" (id, title, "quizId") FROM stdin;
    public       
   dies_admin    false    223   7                 0    16555    Quiz 
   TABLE DATA           K   COPY public."Quiz" (id, title, description, image, "authorId") FROM stdin;
    public       
   dies_admin    false    225   8                 0    16514    Token 
   TABLE DATA           =   COPY public."Token" (id, "accesToken", "userId") FROM stdin;
    public       
   dies_admin    false    219   C:                 0    16503    User 
   TABLE DATA           b   COPY public."User" (id, email, "hashedPassword", "userName", "firstName", "lastName") FROM stdin;
    public       
   dies_admin    false    217   `:                 0    16497    alembic_version 
   TABLE DATA           6   COPY public.alembic_version (version_num) FROM stdin;
    public       
   dies_admin    false    215   8;       (           0    0    Answer_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Answer_id_seq"', 58, true);
          public       
   dies_admin    false    220            )           0    0    Question_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Question_id_seq"', 30, true);
          public       
   dies_admin    false    222            *           0    0    Quiz_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Quiz_id_seq"', 22, true);
          public       
   dies_admin    false    224            +           0    0    Token_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Token_id_seq"', 1, false);
          public       
   dies_admin    false    218            ,           0    0    User_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."User_id_seq"', 3, true);
          public       
   dies_admin    false    216            z           2606    16539    Answer Answer_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Answer" DROP CONSTRAINT "Answer_pkey";
       public         
   dies_admin    false    221            |           2606    16548    Question Question_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Question" DROP CONSTRAINT "Question_pkey";
       public         
   dies_admin    false    223            ~           2606    16562    Quiz Quiz_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Quiz"
    ADD CONSTRAINT "Quiz_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Quiz" DROP CONSTRAINT "Quiz_pkey";
       public         
   dies_admin    false    225            v           2606    16521    Token Token_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Token"
    ADD CONSTRAINT "Token_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Token" DROP CONSTRAINT "Token_pkey";
       public         
   dies_admin    false    219            p           2606    16512    User User_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);
 A   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_email_key";
       public         
   dies_admin    false    217            r           2606    16510    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public         
   dies_admin    false    217            t           2606    16530    User User_userName_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_userName_key" UNIQUE ("userName");
 D   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_userName_key";
       public         
   dies_admin    false    217            n           2606    16501 #   alembic_version alembic_version_pkc 
   CONSTRAINT     j   ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);
 M   ALTER TABLE ONLY public.alembic_version DROP CONSTRAINT alembic_version_pkc;
       public         
   dies_admin    false    215            w           1259    16527    ix_Token_accesToken    INDEX     X   CREATE UNIQUE INDEX "ix_Token_accesToken" ON public."Token" USING btree ("accesToken");
 )   DROP INDEX public."ix_Token_accesToken";
       public         
   dies_admin    false    219            x           1259    16528    ix_Token_id    INDEX     ?   CREATE INDEX "ix_Token_id" ON public."Token" USING btree (id);
 !   DROP INDEX public."ix_Token_id";
       public         
   dies_admin    false    219            �           2606    16578    Answer Answer_questionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."Question"(id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Answer" DROP CONSTRAINT "Answer_questionId_fkey";
       public       
   dies_admin    false    4732    223    221            �           2606    16573    Question Question_quizId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES public."Quiz"(id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Question" DROP CONSTRAINT "Question_quizId_fkey";
       public       
   dies_admin    false    223    4734    225            �           2606    16583    Quiz Quiz_authorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Quiz"
    ADD CONSTRAINT "Quiz_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public."Quiz" DROP CONSTRAINT "Quiz_authorId_fkey";
       public       
   dies_admin    false    217    225    4722                       2606    16522    Token Token_userId_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public."Token"
    ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id);
 E   ALTER TABLE ONLY public."Token" DROP CONSTRAINT "Token_userId_fkey";
       public       
   dies_admin    false    217    4722    219               �   x�MO�N�@�w��舄�`�9�� ѡ��D�'���Q�(��Xq�0�G��R���˧�'�r#�W�/h��y����P�;M�0�OA}&xçUV�-�����uz���\����CV��t�8de&C���s�+#֎�-Zg�=8f�vo�'тo�\̖gn1wW����,ҹ��ϊ�x!'=Өq�}z�BC���[�e�V�"(I�}���ٹG/
8�;�t��7hzǆ��.Ǫ����         �   x�%P�M1��V��Đ�W���R! _tp���la�#f/�,����u�
�����Vm�����Y��#z4�%�)i;˭PtH��A�34�0�K������n���
�ƶvg�.�,��������x`jE�5^ֶ�-��?6h;o�q��=J�K���/'�=x�R_30s!+�ˀg�''�Wn�X����p%X�8��
x;:��ğ`R���$�����P�-�:r��V�j7�'oC�r}!"���p           x�}��n�@�ϛ��#U��8�O���	z��*�DQ��)I�*�RUQD�����M��+̼�,k��U)������?����'����T�2M9�h�S���\�%�9��SFkMV���Ikk�<�F��r��^Yn53�7Ǒ�:}�S�������������N7���u���<z�WA#������4jZ��皇���#Z�Q��7`~OF#i�'�q���0"��L-^�P %[�J:Q؎�aRBŊ>Ës��#N����;�o78X���ݳ|����
+��oy�+�[o�L;�Tz��>�I��G�q�B��`
�\��|�+��/d����`�"��
qꍥ?HYH�*Ӫ$���W�-�D���ye�C|:��L� �_�f2>�q%;��A�{A��Xf�
��l�v)�w��&N�F��{�������<������F�2]?�r����_~��M� �:���
���~U���Z���Z�'K�7j�gАE�n -�ݖix\e���؅(	�ھ�^��h��ig�            x������ � �         �   x�M�I�0  �syg�\��%� kb��Ċ�"�ޘxp0H	��Y֠\:٘{�7����舽��<V��=������4����� {��	�]O��$�d{ը�=v}P#�>�p�����	�Ru�ش�iǑ���_wiw_�%Yu�<f����eBh1�����f��!/P��W�
\p���$I��G�            x�K5H6�H56I361����� ,M�     