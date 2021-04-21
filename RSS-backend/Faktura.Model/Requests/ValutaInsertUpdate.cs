using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model.Requests
{
    public class ValutaInsertUpdate
    {
        public string Oznaka { get; set; }
        public decimal? Tecaj { get; set; }
    }
}
