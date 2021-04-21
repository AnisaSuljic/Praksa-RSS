using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model
{
    public partial class Racun
    {
        public Racun()
        {
            //Stavkes = new HashSet<Stavke>();
        }

        public int RacunId { get; set; }
        public int? BrojRacuna { get; set; }
        public int? KlijentId { get; set; }
        public int? KorisnikId { get; set; }
        public DateTime? Datum { get; set; }
        public DateTime? DatumRacuna { get; set; }
        public DateTime? DatumDospjeca { get; set; }
        public int? SkladisteUlazId { get; set; }
        public int? SkladisteIzlazId { get; set; }
        public string EvidencijskiBroj { get; set; }
        public decimal? IznosRacuna { get; set; }
        public decimal? IznosPoreza { get; set; }
        public int? KupacId { get; set; }
        public int? VrstaPlacanjaId { get; set; }
        public int? Godina { get; set; }
        public int? DokumentId { get; set; }
        public int? ValutaId { get; set; }
        public bool? Placen { get; set; }
        public string Napomena { get; set; }
        //public bool? Obrisan { get; set; }

        //public virtual Dokument Dokument { get; set; }
        //public virtual Klijent Klijent { get; set; }
        //public virtual Korisnik Korisnik { get; set; }
        //public virtual Kupac Kupac { get; set; }
        //public virtual Skladiste SkladisteIzlaz { get; set; }
        //public virtual Skladiste SkladisteUlaz { get; set; }
        //public virtual Valutum Valuta { get; set; }
        //public virtual VrstaPlacanja VrstaPlacanja { get; set; }
        //public virtual ICollection<Stavke> Stavkes { get; set; }
    }
}
