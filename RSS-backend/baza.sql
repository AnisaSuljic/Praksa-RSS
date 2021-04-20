create database Faktura
go

use Faktura
go

create table Klijent
(
	KlijentID int identity(1,1) constraint Klijent_PK primary key,
	Naziv nvarchar(255),
	Adresa nvarchar(255),
	Mjesto nvarchar(255),
	PDVbroj nvarchar(255),
	IDbroj nvarchar(255),
	Telefon nvarchar(255),
	OdgovornaOsoba nvarchar(255),
	Email nvarchar(255),
	Obrisan bit
)

create table Korisnik
(
	KorisnikID int identity(1,1) constraint Korisnik_PK primary key,
	Ime nvarchar(255),
	Prezime nvarchar(255),
	KorisnickoIme nvarchar(255),
	Lozinka nvarchar(255),
	KlijentID int,
	Obrisan bit,
	constraint Korisnik_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID)
)

create table Vrsta
(
	VrstaID int identity(1,1) constraint Vrsta_PK primary key,
	Naziv nvarchar(255),
	KlijentID int,
	Obrisan bit,
	constraint Vrsta_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID)
)

create table Porez
(
	PorezID int identity(1,1) constraint Porez_PK primary key,
	KlijentID int,
	NazivPoreza nvarchar(255),
	Stopa decimal(18,2),
	Obrisan bit,
	constraint Porez_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID)
)

create table Grupa
(
	GrupaID int identity(1,1) constraint Grupa_PK primary key,
	Naziv nvarchar(255),
	VrstaID int,
	KlijentID int,
	PorezID int,
	Obrisan bit,
	constraint Grupa_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID),
	constraint Grupa_Vrsta_FK foreign key (VrstaID)references Vrsta(VrstaID),
	constraint Grupa_Porez_FK foreign key (PorezID)references Porez(PorezID)
)

create table Proizvodjac
(
	ProizvodjacID int identity(1,1) constraint Proizvodjac_PK primary key,
	Naziv nvarchar(255),
	KlijentID int,
	Obrisan bit,
	constraint Proizvodjac_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID)
)

create table JedinicaMjere
(
	JedinicaMjereID int identity(1,1) constraint JedinicaMjere_PK primary key,
	Naziv nvarchar(255),
	KlijentID int,
	Obrisan bit,
	constraint JedinicaMjere_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID)
)

create table Grad
(
	GradID int identity(1,1) constraint Grad_PK primary key,
	Naziv nvarchar(255),
	KlijentID int,
	Obrisan bit,
	constraint Grad_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID)
)

create table Kupac
(
	KupacID int identity(1,1) constraint Kupac_PK primary key,
	Naziv nvarchar(255),
	Adresa nvarchar(255),
	Email nvarchar(255),
	Sifra nvarchar(255),
	Telefon nvarchar(255),
	PDVbroj nvarchar(255),
	GradID int,
	KlijentID int,
	Obrisan bit,
	constraint Kupac_Grad_FK foreign key (GradID)references Grad(GradID),
	constraint Kupac_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID)
)

create table VrstaPlacanja
(
	VrstaPlacanjaID int identity(1,1) constraint VrstaPlacanja_PK primary key,
	Naziv nvarchar(255),
	KlijentID int,
	FiskalniBroj int,
	Obrisan bit,
	constraint VrstaPlacanja_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID)
)

create table Skladiste
(
	SkladisteID int identity(1,1) constraint Skladiste_PK primary key,
	Naziv nvarchar(255),
	KlijentID int,
	Obrisan bit,
	constraint Skladiste_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID)
)

create table Valuta
(
	ValutaID int identity(1,1) constraint Valuta_PK primary key,
	Oznaka nvarchar(255),
	Tecaj decimal(18,2),
	Obrisan bit
)

create table Dokument
(
	DokumentID int identity(1,1) constraint Dokument_PK primary key,
	Naziv nvarchar(255),
	Obrisan bit
)

create table Artikl
(
	ArtiklID int identity(1,1) constraint Artikl_PK primary key,
	Sifra nvarchar(255),
	Naziv nvarchar(255),
	GrupaID int,
	KataloskiBroj nvarchar(255),
	FISbroj int,
	NC decimal(18,2),
	Marza decimal(18,2),
	MarzaIznos decimal(18,2),
	VPC decimal(18,2),
	MPC decimal(18,2),
	ProizvodjacID int,
	KlijentID int,
	JedinicaMjereID int,
	CijenaHH decimal(18,2),
	MinKolNaSkladistu decimal(18,2),
	Opis nvarchar(500),
	Obrisan bit,
	constraint Artikl_Grupa_FK foreign key (GrupaID)references Grupa(GrupaID),
	constraint Artikl_Proizvodjac_FK foreign key (ProizvodjacID)references Proizvodjac(ProizvodjacID),
	constraint Artikl_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID),
	constraint Artikl_JedinicaMjere_FK foreign key (JedinicaMjereID)references JedinicaMjere(JedinicaMjereID)
)

create table Racun
(
	RacunID int identity(1,1) constraint Racun_PK primary key,
	BrojRacuna int,
	KlijentID int,
	KorisnikID int,
	Datum datetime,
	DatumRacuna datetime,
	DatumDospjeca datetime,
	SkladisteUlazID int,
	SkladisteIzlazID int,
	EvidencijskiBroj nvarchar(255),
	IznosRacuna decimal(18,2),
	IznosPoreza decimal(18,2),
	KupacID int,
	VrstaPlacanjaID int,
	Godina int,
	DokumentID int,
	ValutaID int,
	Placen bit,
	Napomena nvarchar(500),
	Obrisan bit,
	constraint Racun_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID),
	constraint Racun_Korisnik_FK foreign key (KorisnikID)references Korisnik(KorisnikID),
	constraint Racun_SkladisteUlaz_FK foreign key (SkladisteUlazID)references Skladiste(SkladisteID),
	constraint Racun_SkladisteIzlazID_FK foreign key (SkladisteIzlazID)references Skladiste(SkladisteID),
	constraint Racun_Kupac_FK foreign key (KupacID)references Kupac(KupacID),
	constraint Racun_VrstaPlacanja_FK foreign key (VrstaPlacanjaID)references VrstaPlacanja(VrstaPlacanjaID),
	constraint Racun_Dokument_FK foreign key (DokumentID)references Dokument(DokumentID),
	constraint Racun_Valuta_FK foreign key (ValutaID)references Valuta(ValutaID)
)

create table Stavke
(
	StavkeID int identity(1,1) constraint Stavke_PK primary key,
	RacunID int,
	KlijentID int,
	DokumentID int,
	RedniBroj int,
	ArtiklID int,
	Kolicina decimal(18,2),
	Rabat decimal(18,2),
	StopaPoreza decimal(18,2),
	CijenaBezPDV decimal(18,2),
	UlaznaCijena decimal(18,2),
	Rabat1 decimal(18,2),
	Rabat2 decimal(18,2),
	NabavnaCijena decimal(18,2),
	PorezID int,
	Datum datetime,
	SkladisteIzlazID int,
	Obrisan bit,
	constraint Stavke_Racun_FK foreign key (RacunID)references Racun(RacunID),
	constraint Stavke_Klijent_FK foreign key (KlijentID)references Klijent(KlijentID),
	constraint Stavke_Dokument_FK foreign key (DokumentID)references Dokument(DokumentID),
	constraint Stavke_Artikl_FK foreign key (ArtiklID)references Artikl(ArtiklID),
	constraint Stavke_Porez_FK foreign key (PorezID)references Porez(PorezID),
	constraint Stavke_SkladisteIzlazID_FK foreign key (SkladisteIzlazID)references Skladiste(SkladisteID)
)