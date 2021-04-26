using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model
{
    public partial class Dokument
    {
        public Dokument()
        {
        }

        public int DokumentId { get; set; }
        public string Naziv { get; set; }
    }
}
