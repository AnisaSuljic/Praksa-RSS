using System;
using System.Collections.Generic;

#nullable disable

namespace RSS_backend.Database
{
    public partial class Valutum
    {
        public Valutum()
        {
            Racuns = new HashSet<Racun>();
        }

        public int ValutaId { get; set; }
        public string Oznaka { get; set; }
        public decimal? Tecaj { get; set; }
        public bool? Obrisan { get; set; }

        public virtual ICollection<Racun> Racuns { get; set; }
    }
}
