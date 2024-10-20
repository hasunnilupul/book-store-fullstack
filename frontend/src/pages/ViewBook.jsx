import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import PageLoader from "../components/PageLoader";
import Alert from "../components/Alert";
import { ALERT_SEVERITY } from "../utils/constants";

const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: ALERT_SEVERITY.INFO,
    message: "",
  });

  // fetch book details
  const fetchBook = async (bookId) => {
    setAlert({
      show: false,
      severity: ALERT_SEVERITY.INFO,
      message: "",
    });
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/books/${bookId}`
      );
      const { data } = resp.data;
      setBook(data);
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

  // init
  useEffect(() => {
    fetchBook(id);
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />

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
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 mt-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book?.id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book?.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book?.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publisher On</span>
            <span>{book?.publishedYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created On</span>
            <span>
              {book?.createdAt && new Date(book?.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Updated On</span>
            <span>
              {book?.updatedAt && new Date(book?.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBook;
