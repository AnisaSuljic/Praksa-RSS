using System;
using System.Collections.Generic;

#nullable disable

namespace RSS_backend.Database
{
    public partial class Dokument
    {
        public Dokument()
        {
            Racuns = new HashSet<Racun>();
            Stavkes = new HashSet<Stavke>();
        }

        public int DokumentId { get; set; }
        public string Naziv { get; set; }
        public bool? Obrisan { get; set; }

        public virtual ICollection<Racun> Racuns { get; set; }
        public virtual ICollection<Stavke> Stavkes { get; set; }
    }
}
