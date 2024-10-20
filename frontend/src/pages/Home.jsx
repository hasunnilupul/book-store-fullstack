import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdAdd, MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import PageLoader from "../components/PageLoader";
import Alert from "../components/Alert";
import { ALERT_SEVERITY } from "../utils/constants";
import CreateBookModal from "../components/CreateBookModal";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: ALERT_SEVERITY.INFO,
    message: "",
  });
  const [openCreateBookModal, setOpenCreateBookModal] = useState(false);

  // fetch all the books
  const fetchBooks = async () => {
    setAlert({
      show: false,
      severity: ALERT_SEVERITY.INFO,
      message: "",
    });
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/books`
      );
      const { data } = resp.data;
      setBooks(data);
    } catch ({response, message}) {
      setAlert({
        show: true,
        severity: ALERT_SEVERITY.ERROR,
        message: response?.data?.message || message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // create book modal submit event handler
  const hanldeCreateBookModalOnSubmit = (book) => {
    setBooks(prevState => [...prevState, book]);
    setOpenCreateBookModal(false);
  }

  // delete a book
  const handleDeleteButtonOnClick = async (bookId) => {
    console.log("Deleting book with id: ", bookId);
  };

  // init
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>

        {/* Create new Book button */}
        <button type="button" onClick={() => setOpenCreateBookModal(true)} className="rounded-md bg-sky-600 p-1 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
          <MdAdd className="text-current text-4xl" />
        </button>
      </div>

      {/* Alert */}
      {alert.show && (
        <div className="flex flex-col my-3">
          <Alert
            severity={alert.severity}
            message={alert.message}
            onClose={() =>
              setAlert({
                show: false,
                severity: ALERT_SEVERITY.INFO,
                message: "",
              })
            }
          />
        </div>
      )}

      {isLoading ? (
        <PageLoader />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">#No.</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Published On
              </th>
              <th className="border border-slate-600 rounded-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book, index) => (
              <tr key={book.id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book?.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book?.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book?.publishedYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/${book.id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/books/${book.id}/edit`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteButtonOnClick(book?.id)}
                    >
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Create Book Modal */}
      {openCreateBookModal && (
        <CreateBookModal
          open={openCreateBookModal}
          onClose={setOpenCreateBookModal}
          onSubmit={hanldeCreateBookModalOnSubmit}
        />
      )}
    </div>
  );
};

export default Home;
