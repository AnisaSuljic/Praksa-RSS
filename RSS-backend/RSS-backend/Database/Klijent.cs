using System;
using System.Collections.Generic;

#nullable disable

namespace RSS_backend.Database
{
    public partial class Klijent
    {
        public Klijent()
        {
            Artikls = new HashSet<Artikl>();
            Grads = new HashSet<Grad>();
            Grupas = new HashSet<Grupa>();
            JedinicaMjeres = new HashSet<JedinicaMjere>();
            Korisniks = new HashSet<Korisnik>();
            Kupacs = new HashSet<Kupac>();
            Porezs = new HashSet<Porez>();
            Proizvodjacs = new HashSet<Proizvodjac>();
            Racuns = new HashSet<Racun>();
            Skladistes = new HashSet<Skladiste>();
            Stavkes = new HashSet<Stavke>();
            Vrsta = new HashSet<Vrstum>();
            VrstaPlacanjas = new HashSet<VrstaPlacanja>();
        }

        public int KlijentId { get; set; }
        public string Naziv { get; set; }
        public string Adresa { get; set; }
        public string Mjesto { get; set; }
        public string Pdvbroj { get; set; }
        public string Idbroj { get; set; }
        public string Telefon { get; set; }
        public string OdgovornaOsoba { get; set; }
        public string Email { get; set; }
        public bool? Obrisan { get; set; }
        public bool? PotvrdjenMail { get; set; }
        public string BankovniRacun { get; set; }

        public virtual ICollection<Artikl> Artikls { get; set; }
        public virtual ICollection<Grad> Grads { get; set; }
        public virtual ICollection<Grupa> Grupas { get; set; }
        public virtual ICollection<JedinicaMjere> JedinicaMjeres { get; set; }
        public virtual ICollection<Korisnik> Korisniks { get; set; }
        public virtual ICollection<Kupac> Kupacs { get; set; }
        public virtual ICollection<Porez> Porezs { get; set; }
        public virtual ICollection<Proizvodjac> Proizvodjacs { get; set; }
        public virtual ICollection<Racun> Racuns { get; set; }
        public virtual ICollection<Skladiste> Skladistes { get; set; }
        public virtual ICollection<Stavke> Stavkes { get; set; }
        public virtual ICollection<Vrstum> Vrsta { get; set; }
        public virtual ICollection<VrstaPlacanja> VrstaPlacanjas { get; set; }
    }
}
