using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace RSS_backend.Database
{
    public partial class FakturaContext : DbContext
    {
        public FakturaContext()
        {
        }

        public FakturaContext(DbContextOptions<FakturaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Artikl> Artikls { get; set; }
        public virtual DbSet<Dokument> Dokuments { get; set; }
        public virtual DbSet<Grad> Grads { get; set; }
        public virtual DbSet<Grupa> Grupas { get; set; }
        public virtual DbSet<JedinicaMjere> JedinicaMjeres { get; set; }
        public virtual DbSet<Klijent> Klijents { get; set; }
        public virtual DbSet<Korisnik> Korisniks { get; set; }
        public virtual DbSet<Kupac> Kupacs { get; set; }
        public virtual DbSet<Porez> Porezs { get; set; }
        public virtual DbSet<Proizvodjac> Proizvodjacs { get; set; }
        public virtual DbSet<Racun> Racuns { get; set; }
        public virtual DbSet<Skladiste> Skladistes { get; set; }
        public virtual DbSet<Stavke> Stavkes { get; set; }
        public virtual DbSet<Valutum> Valuta { get; set; }
        public virtual DbSet<VrstaPlacanja> VrstaPlacanjas { get; set; }
        public virtual DbSet<Vrstum> Vrsta { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=Faktura;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Bosnian_Latin_100_BIN");

            modelBuilder.Entity<Artikl>(entity =>
            {
                entity.ToTable("Artikl");

                entity.Property(e => e.ArtiklId).HasColumnName("ArtiklID");

                entity.Property(e => e.CijenaHh)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("CijenaHH");

                entity.Property(e => e.Fisbroj).HasColumnName("FISbroj");

                entity.Property(e => e.GrupaId).HasColumnName("GrupaID");

                entity.Property(e => e.JedinicaMjereId).HasColumnName("JedinicaMjereID");

                entity.Property(e => e.KataloskiBroj).HasMaxLength(255);

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.Marza).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.MarzaIznos).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.MinKolNaSkladistu).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Mpc)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("MPC");

                entity.Property(e => e.Naziv).HasMaxLength(255);

                entity.Property(e => e.Nc)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("NC");

                entity.Property(e => e.Opis).HasMaxLength(500);

                entity.Property(e => e.ProizvodjacId).HasColumnName("ProizvodjacID");

                entity.Property(e => e.Sifra).HasMaxLength(255);

                entity.Property(e => e.Vpc)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("VPC");

                entity.HasOne(d => d.Grupa)
                    .WithMany(p => p.Artikls)
                    .HasForeignKey(d => d.GrupaId)
                    .HasConstraintName("Artikl_Grupa_FK");

                entity.HasOne(d => d.JedinicaMjere)
                    .WithMany(p => p.Artikls)
                    .HasForeignKey(d => d.JedinicaMjereId)
                    .HasConstraintName("Artikl_JedinicaMjere_FK");

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.Artikls)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("Artikl_Klijent_FK");

                entity.HasOne(d => d.Proizvodjac)
                    .WithMany(p => p.Artikls)
                    .HasForeignKey(d => d.ProizvodjacId)
                    .HasConstraintName("Artikl_Proizvodjac_FK");
            });

            modelBuilder.Entity<Dokument>(entity =>
            {
                entity.ToTable("Dokument");

                entity.Property(e => e.DokumentId).HasColumnName("DokumentID");

                entity.Property(e => e.Naziv).HasMaxLength(255);
            });

            modelBuilder.Entity<Grad>(entity =>
            {
                entity.ToTable("Grad");

                entity.Property(e => e.GradId).HasColumnName("GradID");

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.Naziv).HasMaxLength(255);

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.Grads)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("Grad_Klijent_FK");
            });

            modelBuilder.Entity<Grupa>(entity =>
            {
                entity.ToTable("Grupa");

                entity.Property(e => e.GrupaId).HasColumnName("GrupaID");

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.Naziv).HasMaxLength(255);

                entity.Property(e => e.PorezId).HasColumnName("PorezID");

                entity.Property(e => e.VrstaId).HasColumnName("VrstaID");

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.Grupas)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("Grupa_Klijent_FK");

                entity.HasOne(d => d.Porez)
                    .WithMany(p => p.Grupas)
                    .HasForeignKey(d => d.PorezId)
                    .HasConstraintName("Grupa_Porez_FK");

                entity.HasOne(d => d.Vrsta)
                    .WithMany(p => p.Grupas)
                    .HasForeignKey(d => d.VrstaId)
                    .HasConstraintName("Grupa_Vrsta_FK");
            });

            modelBuilder.Entity<JedinicaMjere>(entity =>
            {
                entity.ToTable("JedinicaMjere");

                entity.Property(e => e.JedinicaMjereId).HasColumnName("JedinicaMjereID");

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.Naziv).HasMaxLength(255);

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.JedinicaMjeres)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("JedinicaMjere_Klijent_FK");
            });

            modelBuilder.Entity<Klijent>(entity =>
            {
                entity.ToTable("Klijent");

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.Adresa).HasMaxLength(255);

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.Idbroj)
                    .HasMaxLength(255)
                    .HasColumnName("IDbroj");

                entity.Property(e => e.Mjesto).HasMaxLength(255);

                entity.Property(e => e.Naziv).HasMaxLength(255);

                entity.Property(e => e.OdgovornaOsoba).HasMaxLength(255);

                entity.Property(e => e.Pdvbroj)
                    .HasMaxLength(255)
                    .HasColumnName("PDVbroj");

                entity.Property(e => e.Telefon).HasMaxLength(255);
            });

            modelBuilder.Entity<Korisnik>(entity =>
            {
                entity.ToTable("Korisnik");

                entity.Property(e => e.KorisnikId).HasColumnName("KorisnikID");

                entity.Property(e => e.Ime).HasMaxLength(255);

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.KorisnickoIme).HasMaxLength(255);

                entity.Property(e => e.Lozinka).HasMaxLength(255);

                entity.Property(e => e.Prezime).HasMaxLength(255);

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.Korisniks)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("Korisnik_Klijent_FK");
            });

            modelBuilder.Entity<Kupac>(entity =>
            {
                entity.ToTable("Kupac");

                entity.Property(e => e.KupacId).HasColumnName("KupacID");

                entity.Property(e => e.Adresa).HasMaxLength(255);

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.GradId).HasColumnName("GradID");

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.Naziv).HasMaxLength(255);

                entity.Property(e => e.Pdvbroj)
                    .HasMaxLength(255)
                    .HasColumnName("PDVbroj");

                entity.Property(e => e.Sifra).HasMaxLength(255);

                entity.Property(e => e.Telefon).HasMaxLength(255);

                entity.HasOne(d => d.Grad)
                    .WithMany(p => p.Kupacs)
                    .HasForeignKey(d => d.GradId)
                    .HasConstraintName("Kupac_Grad_FK");

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.Kupacs)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("Kupac_Klijent_FK");
            });

            modelBuilder.Entity<Porez>(entity =>
            {
                entity.ToTable("Porez");

                entity.Property(e => e.PorezId).HasColumnName("PorezID");

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.NazivPoreza).HasMaxLength(255);

                entity.Property(e => e.Stopa).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.Porezs)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("Porez_Klijent_FK");
            });

            modelBuilder.Entity<Proizvodjac>(entity =>
            {
                entity.ToTable("Proizvodjac");

                entity.Property(e => e.ProizvodjacId).HasColumnName("ProizvodjacID");

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.Naziv).HasMaxLength(255);

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.Proizvodjacs)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("Proizvodjac_Klijent_FK");
            });

            modelBuilder.Entity<Racun>(entity =>
            {
                entity.ToTable("Racun");

                entity.Property(e => e.RacunId).HasColumnName("RacunID");

                entity.Property(e => e.BrojRacuna).HasMaxLength(255);

                entity.Property(e => e.Datum).HasColumnType("datetime");

                entity.Property(e => e.DatumDospjeca).HasColumnType("datetime");

                entity.Property(e => e.DatumRacuna).HasColumnType("datetime");

                entity.Property(e => e.DokumentId).HasColumnName("DokumentID");

                entity.Property(e => e.EvidencijskiBroj).HasMaxLength(255);

                entity.Property(e => e.Fisbroj).HasColumnName("FISbroj");

                entity.Property(e => e.IznosPoreza).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.IznosRacuna).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.IznosSaPdv).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.KorisnikId).HasColumnName("KorisnikID");

                entity.Property(e => e.KupacId).HasColumnName("KupacID");

                entity.Property(e => e.Napomena).HasMaxLength(500);

                entity.Property(e => e.SkladisteIzlazId).HasColumnName("SkladisteIzlazID");

                entity.Property(e => e.SkladisteUlazId).HasColumnName("SkladisteUlazID");

                entity.Property(e => e.ValutaId).HasColumnName("ValutaID");

                entity.Property(e => e.VrstaPlacanjaId).HasColumnName("VrstaPlacanjaID");

                entity.HasOne(d => d.Dokument)
                    .WithMany(p => p.Racuns)
                    .HasForeignKey(d => d.DokumentId)
                    .HasConstraintName("Racun_Dokument_FK");

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.Racuns)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("Racun_Klijent_FK");

                entity.HasOne(d => d.Korisnik)
                    .WithMany(p => p.Racuns)
                    .HasForeignKey(d => d.KorisnikId)
                    .HasConstraintName("Racun_Korisnik_FK");

                entity.HasOne(d => d.Kupac)
                    .WithMany(p => p.Racuns)
                    .HasForeignKey(d => d.KupacId)
                    .HasConstraintName("Racun_Kupac_FK");

                entity.HasOne(d => d.SkladisteIzlaz)
                    .WithMany(p => p.RacunSkladisteIzlazs)
                    .HasForeignKey(d => d.SkladisteIzlazId)
                    .HasConstraintName("Racun_SkladisteIzlazID_FK");

                entity.HasOne(d => d.SkladisteUlaz)
                    .WithMany(p => p.RacunSkladisteUlazs)
                    .HasForeignKey(d => d.SkladisteUlazId)
                    .HasConstraintName("Racun_SkladisteUlaz_FK");

                entity.HasOne(d => d.Valuta)
                    .WithMany(p => p.Racuns)
                    .HasForeignKey(d => d.ValutaId)
                    .HasConstraintName("Racun_Valuta_FK");

                entity.HasOne(d => d.VrstaPlacanja)
                    .WithMany(p => p.Racuns)
                    .HasForeignKey(d => d.VrstaPlacanjaId)
                    .HasConstraintName("Racun_VrstaPlacanja_FK");
            });

            modelBuilder.Entity<Skladiste>(entity =>
            {
                entity.ToTable("Skladiste");

                entity.Property(e => e.SkladisteId).HasColumnName("SkladisteID");

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.Naziv).HasMaxLength(255);

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.Skladistes)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("Skladiste_Klijent_FK");
            });

            modelBuilder.Entity<Stavke>(entity =>
            {
                entity.ToTable("Stavke");

                entity.Property(e => e.StavkeId).HasColumnName("StavkeID");

                entity.Property(e => e.ArtiklId).HasColumnName("ArtiklID");

                entity.Property(e => e.CijenaBezPdv)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("CijenaBezPDV");

                entity.Property(e => e.Datum).HasColumnType("datetime");

                entity.Property(e => e.DokumentId).HasColumnName("DokumentID");

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.Kolicina).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.NabavnaCijena).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.PorezId).HasColumnName("PorezID");

                entity.Property(e => e.Rabat).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Rabat1).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Rabat2).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.RacunId).HasColumnName("RacunID");

                entity.Property(e => e.SkladisteIzlazId).HasColumnName("SkladisteIzlazID");

                entity.Property(e => e.StopaPoreza).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.UlaznaCijena).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Artikl)
                    .WithMany(p => p.Stavkes)
                    .HasForeignKey(d => d.ArtiklId)
                    .HasConstraintName("Stavke_Artikl_FK");

                entity.HasOne(d => d.Dokument)
                    .WithMany(p => p.Stavkes)
                    .HasForeignKey(d => d.DokumentId)
                    .HasConstraintName("Stavke_Dokument_FK");

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.Stavkes)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("Stavke_Klijent_FK");

                entity.HasOne(d => d.Porez)
                    .WithMany(p => p.Stavkes)
                    .HasForeignKey(d => d.PorezId)
                    .HasConstraintName("Stavke_Porez_FK");

                entity.HasOne(d => d.Racun)
                    .WithMany(p => p.Stavkes)
                    .HasForeignKey(d => d.RacunId)
                    .HasConstraintName("Stavke_Racun_FK");

                entity.HasOne(d => d.SkladisteIzlaz)
                    .WithMany(p => p.Stavkes)
                    .HasForeignKey(d => d.SkladisteIzlazId)
                    .HasConstraintName("Stavke_SkladisteIzlazID_FK");
            });

            modelBuilder.Entity<Valutum>(entity =>
            {
                entity.HasKey(e => e.ValutaId)
                    .HasName("Valuta_PK");

                entity.Property(e => e.ValutaId).HasColumnName("ValutaID");

                entity.Property(e => e.Oznaka).HasMaxLength(255);

                entity.Property(e => e.Tecaj).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<VrstaPlacanja>(entity =>
            {
                entity.ToTable("VrstaPlacanja");

                entity.Property(e => e.VrstaPlacanjaId).HasColumnName("VrstaPlacanjaID");

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.Naziv).HasMaxLength(255);

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.VrstaPlacanjas)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("VrstaPlacanja_Klijent_FK");
            });

            modelBuilder.Entity<Vrstum>(entity =>
            {
                entity.HasKey(e => e.VrstaId)
                    .HasName("Vrsta_PK");

                entity.Property(e => e.VrstaId).HasColumnName("VrstaID");

                entity.Property(e => e.KlijentId).HasColumnName("KlijentID");

                entity.Property(e => e.Naziv).HasMaxLength(255);

                entity.HasOne(d => d.Klijent)
                    .WithMany(p => p.Vrsta)
                    .HasForeignKey(d => d.KlijentId)
                    .HasConstraintName("Vrsta_Klijent_FK");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
