using System;
using System.Collections.Generic;

#nullable disable

namespace RSS_backend.Database
{
    public partial class Vrstum
    {
        public Vrstum()
        {
            Grupas = new HashSet<Grupa>();
        }

        public int VrstaId { get; set; }
        public string Naziv { get; set; }
        public int? KlijentId { get; set; }
        public bool? Obrisan { get; set; }

        public virtual Klijent Klijent { get; set; }
        public virtual ICollection<Grupa> Grupas { get; set; }
    }
}
