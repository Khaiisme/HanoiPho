import { useState, useEffect, useRef } from "react";
import Table from "./components/Table";
import Modal from "./components/Modal";
import BillsPage from "./components/Bills"
import { FiRotateCcw } from 'react-icons/fi';
// Sample dish data (name and price)
import { FiRepeat } from "react-icons/fi";
const dishes = [
   { name: "01.GemuseSuppe", price: 4.5 },
  { name: "02.HühnerSuppe", price:  5.5},
  { name: "03.GarnellenSuppe", price: 6.5 },
  { name: "04.FishSuppe", price:6.5  },
  { name: "05.VantanSuppe", price:6  },
  { name: "06a.GlasnudelsupTofu", price: 5 },
  { name: "06b.GlasnudelsupHühn", price: 6 },
  { name: "06c.GlasnudelsupGarnel", price:6.5  },
  { name: "07a.TomSuppe Tofu", price: 5 },
  { name: "07b.TomSuppe Hühner", price: 6 },
  { name: "08.TomJun", price: 7.5  },
  { name: "11a.Nem Hanoi", price: 4.5 },
  { name: "11b.Nem Hanoi", price: 5.5 },
  { name: "12a.Sommerrollen", price: 4.5 },
  { name: "12b.Sommerrollen", price: 5.5 },
  { name: "13.Garnelen fritiert", price: 7.5 },
  { name: "14.Vantan gebacken", price: 6.5 },
  { name: "15.Cha Hanoi", price: 6.5 },
  { name: "16.GemüseSalat ", price: 4.5 },
  { name: "17a.MangoSalat", price: 5.5 },
  { name: "17b.Mangosalat", price: 7.5 },
  { name: "18.Hühnersalat", price: 6 },
  { name: "19.Rindersalat", price: 6.5 },
  { name: "20a", price: 6 },
  { name: "20b", price: 7 },
  { name: "20c", price: 7.5 },
  { name: "09a.GlasnudelnSupp Tofu", price: 9 },
  { name: "09b.GlasnudelnSupp Hühner", price: 10 },
  { name: "09e.GlasnudelnSupp Garnelen", price: 14},
  { name: "09f.GlasnudelnSupp ", price:  18},
  { name: "10a.Gebratenglasnudel Tofu", price: 9 },
  { name: "10b.Gebratenglasnudel Hühner", price: 10 },
  { name: "10c.Gebratenglasnudel Rind", price: 13 },
  { name: "10d.Gebratenglasnudel Enten", price: 11 },
  { name: "10e.Gebratenglasnudel Garnelen", price: 14 },
  { name: "10f.Gebratenglasnudel ", price: 18 },
  { name: "21a.Pho Tofu", price: 9 },
  { name: "21b.Pho Hühner", price: 10 },
  { name: "21c.Pho Rind", price: 13 },
  { name: "21f.Pho Special", price: 13 },
  { name: "29.Bo Sot Vang", price: 12 },
  { name: "52a.Curry Reisbandnudel Tofu", price:10  },
  { name: "52b.Curry Reisbandnudel Hühner", price:11  },
  { name: "52c.Curry Reisbandnudel Rind", price: 13 },
  { name: "52e.Curry Reisbandnudel Garnel", price:14  },
  { name: "52f.Curry Reisbandnudel Special", price: 18 },
  { name: "22a.Gebraten Nudeln Tofu", price: 10 },
  { name: "22b.Gebraten Nudeln Hühner", price: 11 },
  { name: "22c.Gebraten Nudeln Rind", price: 13 },
  { name: "22d.Gebraten Nudeln Enten", price: 12 },
  { name: "22e.Gebraten Nudeln Garnel", price:  14},
  { name: "22f.Gebraten Nudeln Special", price: 18 },
  { name: "23a.Pho Hanoi Tofu", price: 9 },
  { name: "23b.Pho Hanoi Hühner", price: 11 },
  { name: "23c.Pho Hanoi Fisch", price: 14 },
  { name: "25.", price: 13 },
  { name: "26.Bun Tofu gebacken", price: 10 },
  { name: "27.Bun cha Hanoi", price: 12 },
  { name: "28.Bun nem Hanoi", price: 11 },
  { name: "30", price: 22 },
  { name: "31", price: 14 },
  { name: "32a.Gebraten Udom Tofu ", price: 10 },
  { name: "32b.Gebraten Udom Hühner", price: 11 },
  { name: "32c.Gebraten Udom Rind", price: 13 },
  { name: "32d.Gebraten Udom Enten", price: 11 },
  { name: "32e.Gebraten Udom Garnel", price: 14 },
  { name: "32f.Gebraten Udom Special", price: 18 },
  { name: "33a.RotCurry Tofu", price: 9 },
  { name: "33b.RotCurry Hühner", price: 10 },
  { name: "33c.RotCurry Rind", price: 13 },
  { name: "33d.RotCurry Enten", price: 11 },
  { name: "33e.RotCurry Garnel", price: 14 },
  { name: "34a.MangoSauce Tofu", price: 9 },
  { name: "34b.MangoSauce Hühner", price: 10 },
  { name: "34c.MangoSauce Rind", price: 11 },
  { name: "35a.ErdnussSauce Tofu", price: 9 },
  { name: "35b.ErdnussSauce Hühner", price:10  },
  { name: "35c.ErdnussSauce Rind", price: 13 },
  { name: "35d.ErdnussSauce Enten", price: 11},
  { name: "35e.ErdnussSauce Garnel", price: 14 },
  { name: "36a.Pho Sauce Tofu", price: 9 },
  { name: "36b.Pho Sauce Hühner", price:10  },
  { name: "36c.Pho Sauce Rind", price: 13 },
  { name: "36d.Pho Sauce Enten", price:11  },
  { name: "36e.Pho Sauce Garnel", price: 14 },
  { name: "37a.XaoXaOt Tofu", price: 9 },
  { name: "37b.XaoXaOt Hühner", price: 10 },
  { name: "37c.XaoXaOt Rind", price: 13 },
  { name: "37d.XaoXaOt Enten", price: 11 },
  { name: "37e.XaoXaOt Garnel", price: 14 },
  { name: "38.", price: 13 },
  { name: "39.Gegrillte Garnelen", price: 40 },
  { name: "40.", price: 40 },
  { name: "41a.Knusprige Hühner", price: 11 },
  { name: "41b.Knusprige Hühner", price: 11 },
  { name: "41c.Knusprige Hühner", price: 11 },
  { name: "41d.Knusprige Hühner", price: 11 },
  { name: "41e.Knusprige Hühner", price: 11 },
  { name: "42a.Knusprige Ente", price: 14 },
  { name: "42b.Knusprige Ente", price: 14 },
  { name: "42c.Knusprige Ente", price: 14 },
  { name: "42d.Knusprige Ente", price: 14 },
  { name: "42e.Knusprige Ente", price: 14 },
  { name: "43a.Knusprige Hühnerschenkel", price: 12 },
  { name: "43b.Knusprige Hühnerschenkel", price: 12 },
  { name: "43c.Knusprige Hühnerschenkel", price: 12 },
  { name: "43d.Knusprige Hühnerschenkel", price: 12 },
  { name: "43e.Knusprige Hühnerschenkel", price: 12 },
  { name: "44.Tofu gebacken mit Tomaten", price: 10 },
  { name: "45.Lachs gebacken mit Tomaten", price: 14 },
  { name: "46a.Fisch gebacken", price: 14 },
  { name: "46b.Fisch gebacken", price: 14 },
  { name: "46c.Fisch gebacken", price: 14 },
  { name: "46d.Fisch gebacken", price: 14 },
  { name: "46e.Fisch gebacken", price: 14 },
  { name: "47a.GebratenNudeln Tofu", price: 9 },
  { name: "47b.GebratenNudeln Hühner", price: 10 },
  { name: "47c.GebratenNudeln Rind", price: 13 },
  { name: "47d.GebratenNudeln Enten", price: 11 },
  { name: "47e.GebratenNudeln Garnel", price: 14 },
  { name: "47f.GebratenNudeln knus Hühner", price: 12 },
  { name: "47g.GebratenNudeln knus Enten", price: 14 },
  { name: "48a.GebratenReis Tofu", price: 9 },
  { name: "48b.GebratenReis Hühner", price: 10 },
  { name: "48c.GebratenReis Rind", price: 13 },
  { name: "48d.GebratenReis Enten", price: 11 },
  { name: "48e.GebratenReis Garnel", price: 14 },
  { name: "48f.GebratenReis knus Hühner", price: 12 },
  { name: "48g.GebratenReis knus Ente", price: 14 },
  { name: "U1 mit Tofu", price:10  },
  { name: "U2 mit Hühner", price: 11 },
  { name: "U3 mit Rind", price: 13 },
  { name: "U4 mit Enten", price: 12 },
  { name: "U5 mit Garnel", price: 15 },
  { name: "U6 mit Fisch", price: 15 },
  { name: "U7 mit knusprige Hühner", price: 14 },
  { name: "U8 mit knusprige Enten", price: 15 },
  { name: "R1 mit Tofu", price:10  },
  { name: "R2 mit Hühner", price: 11 },
  { name: "R3 mit Rind", price: 13 },
  { name: "R4 mit Enten", price: 12 },
  { name: "R5 mit Garnel", price: 15 },
  { name: "R6 mit Fisch", price: 15 },
  { name: "R7 mit knusprige Hühner", price: 14 },
  { name: "R8 mit knusprige Enten", price: 15 },
  { name: "G1 mit Tofu", price:10  },
  { name: "G2 mit Hühner", price: 11 },
  { name: "G3 mit Rind", price: 13 },
  { name: "G4 mit Enten", price: 12 },
  { name: "G5 mit Garnel", price: 15 },
  { name: "G6 mit Fisch", price: 15 },
  { name: "G7 mit knusprige Hühner", price: 14 },
  { name: "G8 mit knusprige Enten", price: 15 },
  { name: "B1 mit Tofu", price:10  },
  { name: "B2 mit Hühner", price: 11 },
  { name: "B3 mit Rind", price: 13 },
  { name: "B4 mit Enten", price: 12 },
  { name: "B5 mit Garnel", price: 15 },
  { name: "B6 mit Fisch", price: 15 },
  { name: "B7 mit knusprige Hühner", price: 14 },
  { name: "B8 mit knusprige Enten", price: 15 },
  { name: "USC 1 mit Tofu", price: 10 },
  { name: "USC 2 mit Hühner", price: 12 },
  { name: "USC 3 mit Rind", price: 14 },
  { name: "USC 4 mit Garnel", price: 16 },
  { name: "US 1 mit Tofu", price: 10 },
  { name: "US 2 mit Hühner", price: 12 },
  { name: "US 3 mit Rind", price: 14 },
  { name: "US 4 mit Garnelen", price: 16 },
  { name: "V1", price: 14 },
  { name: "V2", price: 14 },
  { name: "V3", price: 14 },
  { name: "V4", price: 14 },
  { name: "V5", price: 14 },
  { name: "D1", price: 12 },
  { name: "D2", price: 12 },
  { name: "D3", price: 12 },
  { name: "D4", price: 12 },
  { name: "D5", price: 12 },
  { name: "49.Gebacken Banana", price: 3.9 },

  { name: "Flasche Wasser", price: 7 },
  { name: "Grüner Tee", price: 2.8 },
  { name: "Jasmin Tee", price: 2.8 },
  { name: "Ingwer Tee", price: 3.5 },
  { name: "Kumquat Tee", price: 3.5 },
  { name: "Limet-Zitron Tee", price: 3.5 },
  { name: "Kaffe ", price: 2.5 },
  { name: "Capuchino", price:2.5  },
  { name: "Latte Machiato", price: 3 },
  { name: "Espresso", price: 2.2 },
  { name: "Kaffe VietNam", price: 4.5 },
  
  { name: "Wasser Still", price:3.8 },
  { name: "Mineralwasser", price: 3.8 },
  { name: "Coca Cola ", price: 3.8 },
  { name: "Coca Light ", price: 3.8 },
  { name: "Coca Zero ", price: 3.8 },
  { name: "Spezi ", price: 3.8 },
  { name: "Fanta ", price: 3.8 },
  { name: "Sprite ", price:3.8 },
  { name: "Wasser Still", price: 2.5 },
  { name: "Mineralwasser", price: 2.5 },
  { name: "Coca Cola ", price: 2.5 },
  { name: "Coca Light ", price: 2.5 },
  { name: "Coca Zero ", price: 2.5 },
  { name: "Spezi ", price: 2.5 },
  { name: "Fanta ", price: 2.5 },
  { name: "Sprite ", price: 2.5 },
  { name: "Ginger Ale", price: 3 },
  { name: "Bitte Lemon", price: 3 },
  { name: "Tonic Wasser", price: 3 },
  { name: "Apfelschorle", price: 3 },
  { name: "Ginger Ale", price: 4 },
  { name: "Bitte Lemon", price: 4 },
  { name: "Tonic Wasser", price: 4 },
  { name: "Apfelschorle", price: 4 },
  { name: "Orangesaft", price: 3 },
  { name: "Apfelsaft", price: 3 },
  { name: "Annasaft", price: 3 },
  { name: "Bananasaft", price: 3 },
  { name: "Kirschsaft", price: 3 },
  { name: "Mangosaft", price: 3 },
  { name: "Maracujasaft", price: 3 },
  { name: "Guavensaft", price: 3 },
  { name: "Litschisaft", price: 3 },
  { name: "Kiba", price: 3 },
  { name: "Orangesaft", price: 4 },
  { name: "Apfelsaft", price: 4 },
  { name: "Annasaft", price: 4 },
  { name: "Bananasaft", price: 4 },
  { name: "Kirschsaft", price: 4 },
  { name: "Mangosaft", price: 4 },
  { name: "Maracujasaft", price: 4 },
  { name: "Guavensaft", price: 4},
  { name: "Litschisaft", price: 4 },
  { name: "Kiba", price: 4 },

  { name: "Jever Klein", price: 3 },
  { name: "Radler Klein ", price: 3 },
  { name: "Diesel Klein", price: 3 },
  { name: "Jever Groß", price: 4.2 },
  { name: "Radler Groß", price: 4.2 },
  { name: "Diesel Groß", price: 4.2 },
  { name: "Taiger Bier ", price: 3.8 },
  { name: "Saigon Bier", price: 3.8 },
  { name: "Hefeweizen ", price: 3.8 },
  { name: "Hefeweizen Dunkel", price: 3.8 },
  { name: "Hefeweizen Kristall", price: 3.8 },
  { name: "Hefeweizen Alkoholfrei", price: 3.8 },
  { name: "1 Shot Alkohol ", price: 2.6 },
  { name: "Chardonay ", price: 6 },
  { name: "Riesling ", price: 6 },
  { name: "Sauvignon ", price: 6 },
  { name: "Grauburgrunder ", price: 5.5 },
  { name: "Müller Thurgau ", price: 6 },
  { name: "Flasche von Weißwein/Rotwein", price: 19.9 },
  { name: "Merlot", price: 6 },
  { name: "Bordeaux", price: 6 },
];


const App = () => {



  // Read from localStorage and set the initial state for tables and orders
  const storedTables = JSON.parse(localStorage.getItem("tables")) || [
    ...Array.from({ length: 15 }, (_, i) => i + 1),         // 1 to 11
    ...Array.from({ length: 8 }, (_, i) => i + 20)          // 15 to 19
  ];

  const [tables, setTables] = useState(storedTables);
  const [storedOrders, setStoredOrders] = useState(() => {
    try {
      const raw = localStorage.getItem("orders");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error("Failed to parse orders from localStorage:", e);
      return {};
    }
  });
  const [orderItems, setOrderItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isModalOpenRef = useRef(isModalOpen);
  const [currentTable, setCurrentTable] = useState(null);
  const [loading, setLoading] = useState(false); // No loading needed since no API
  const [showModal, setShowModal] = useState(false);
  const [firstTable, setFirstTable] = useState("");
  const [secondTable, setSecondTable] = useState("");
  const [showBills, setShowBills] = useState(false);



  useEffect(() => {
    const INACTIVITY_LIMIT = 40 * 60 * 1000; // 40 minutes
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.setItem("forceReload", "true");
      }, INACTIVITY_LIMIT);
    };

    // Activity listeners
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // start timer

    return () => {
      clearTimeout(timer);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, []);

  useEffect(() => {
    const shouldReload = localStorage.getItem("forceReload");

    if (shouldReload === "true") {
      localStorage.removeItem("forceReload");
      window.location.reload();
    }
  }, []);

  // Keep ref always up-to-date
  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);


  // Handle clicking on a table to open the modal and reset order items
  const handleTableClick = async (tableName) => {
    setCurrentTable(tableName);
    setOrderItems(storedOrders[tableName] || []);
    setIsModalOpen(true);
  };

  // Add order item (dish) to the list
  const addOrderItem = async (name, price) => {
    const newOrderItem = { name, price };
    const updatedOrderItems = [...orderItems, newOrderItem];

    // ✅ only update the chosen table in localStorage and state
    const updatedOrders = { ...storedOrders, [currentTable]: updatedOrderItems };
    setOrderItems(updatedOrderItems);
    setStoredOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };




  // Remove order item from the list
  const removeOrderItem = async (index) => {
    const updatedOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedOrderItems);

    // 💾 Update localStorage and state
    const updatedOrders = { ...storedOrders, [currentTable]: updatedOrderItems };
    setStoredOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };



  const tablesWithOrders = Object.keys(storedOrders).filter(
    (table) => storedOrders[table] && storedOrders[table].length > 0
  ).map(Number); // convert to number if needed


  const handleRefreshTwice = () => {
    // First reload
    window.location.reload();

  };


  const switchTables = async () => {
    if (!firstTable || !secondTable) return;

    const t1 = String(firstTable).trim();
    const t2 = String(secondTable).trim();

    if (t1 === t2) {
      console.warn("❌ Cannot swap the same table");
      return;
    }

    // Ensure tables exist in our orders map (empty array means “no orders yet”)
    const updatedOrders = { ...storedOrders };
    if (!Object.prototype.hasOwnProperty.call(updatedOrders, t1)) updatedOrders[t1] = [];
    if (!Object.prototype.hasOwnProperty.call(updatedOrders, t2)) updatedOrders[t2] = [];

    // Swap the arrays
    [updatedOrders[t1], updatedOrders[t2]] = [updatedOrders[t2], updatedOrders[t1]];

    // Persist
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setStoredOrders(updatedOrders);

    // Update visible table if it was one of the swapped ones
    const current = String(currentTable);
    if (current === t1 || current === t2) {
      setOrderItems(updatedOrders[current] || []);
    }

    console.log("✔ Swap completed successfully");

    setFirstTable("");
    setSecondTable("");
    setShowModal(false);
  };



  return (
    <div className="w-full overflow-y-auto bg-white text-black flex flex-col items-center p-15">
      <h1 className="text-3xl text-green-300 font-bold mb-3">Hanoi Pho</h1>
      <button onClick={handleRefreshTwice} style={{ fontSize: '24px', cursor: 'pointer', background: 'none', border: 'none' }}>
        <FiRotateCcw />
      </button>
      <div className="grid grid-cols-3 gap-4 w-full">
        {tables.map((table, index) => {
          const hasOrder = tablesWithOrders.includes(table);

          return (
            <div
              key={index}
              className={`cursor-pointer rounded-xl p-2 transition-colors select-none ${hasOrder ? "bg-green-200 text-white" : "bg-white"
                }`}
              onClick={() => {
                handleTableClick(table);

              }}
            >
              <Table number={table} />
            </div>
          );
        })}
      </div>


      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tableName={currentTable}
        orderItems={orderItems}
        setOrderItems={setOrderItems}
        tables={tables}
        setTables={setTables}
        addOrderItem={addOrderItem}
        removeOrderItem={removeOrderItem}
        dishes={dishes}
        storedOrders={storedOrders}
        setStoredOrders={setStoredOrders}
      />

      <div className="flex gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-3 py-2 bg-green-300 hover:bg-blue-600 text-black rounded-lg shadow"
        >
          <FiRepeat className="w-5 h-5" />
          Đổi bàn
        </button>

        <button
          onClick={() => setShowBills(true)}
          className="bg-green-300 text-black px-3 py-1 rounded"
        >
          Lịch sử bàn
        </button>
      </div>

      {showBills && (
        <div className="fixed inset-0 bg-gray-300 flex justify-center items-center p-4">

          {/* Modal */}
          <div className="bg-white p-4 rounded-lg shadow-xl max-h-[80vh]
                  overflow-y-auto w-[90%] max-w-md">
            <BillsPage />
          </div>

          {/* FIXED close button (MOBILE POSITION) */}
          <button
            onClick={() => setShowBills(false)}
            className="fixed top-4 right-4 md:hidden
               bg-white text-gray-700 text-3xl rounded-full shadow 
               w-10 h-10 flex items-center justify-center z-50"
          >
            ✕
          </button>

          {/* FIXED close button (DESKTOP BESIDE MODAL) */}
          <button
            onClick={() => setShowBills(false)}
            className="hidden md:flex fixed top-10 
               right-[calc(50%-280px)]   /* position beside modal */
               bg-white text-gray-700 text-3xl rounded-full shadow 
               w-12 h-12 items-center justify-center z-50"
          >
            ✕
          </button>

        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Đổi Bàn
            </h2>

            <div className="flex flex-col gap-3 mb-4">
              <input
                type="number"
                placeholder="First table number"
                value={firstTable}
                onChange={(e) => setFirstTable(e.target.value)}
                className="border rounded-lg p-2 w-full"
              />
              <input
                type="number"
                placeholder="Second table number"
                value={secondTable}
                onChange={(e) => setSecondTable(e.target.value)}
                className="border rounded-lg p-2 w-full"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 text-black hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={switchTables}
                disabled={!firstTable || !secondTable}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>




  );
};

export default App;
