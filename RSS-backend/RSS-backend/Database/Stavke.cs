using System;
using System.Collections.Generic;

#nullable disable

namespace RSS_backend.Database
{
    public partial class Stavke
    {
        public int StavkeId { get; set; }
        public int? RacunId { get; set; }
        public int? KlijentId { get; set; }
        public int? DokumentId { get; set; }
        public int? RedniBroj { get; set; }
        public int? ArtiklId { get; set; }
        public decimal? Kolicina { get; set; }
        public decimal? Rabat { get; set; }
        public decimal? StopaPoreza { get; set; }
        public decimal? CijenaBezPdv { get; set; }
        public decimal? UlaznaCijena { get; set; }
        public decimal? Rabat1 { get; set; }
        public decimal? Rabat2 { get; set; }
        public decimal? NabavnaCijena { get; set; }
        public int? PorezId { get; set; }
        public DateTime? Datum { get; set; }
        public int? SkladisteIzlazId { get; set; }
        public bool? Obrisan { get; set; }

        public virtual Artikl Artikl { get; set; }
        public virtual Dokument Dokument { get; set; }
        public virtual Klijent Klijent { get; set; }
        public virtual Porez Porez { get; set; }
        public virtual Racun Racun { get; set; }
        public virtual Skladiste SkladisteIzlaz { get; set; }
    }
}
