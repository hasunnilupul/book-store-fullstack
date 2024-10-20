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
    } catch ({ response, message }) {
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
      <h2 className="mt-3 text-lg font-semibold leading-7 text-gray-900">
        Create book
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Book details and information.
        </p>
      </h2>

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
        <div className="flex flex-col mt-3 w-full border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Title
              </dt>
              <dd className="mt-1 sm:col-span-2 sm:mt-0">{book?.title}</dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Author
              </dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {book?.author}
              </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Published On
              </dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {book?.publishedYear}
              </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Created On
              </dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {new Date(book?.createdAt).toLocaleString()}
              </dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Last Updated On
              </dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {new Date(book?.updatedAt).toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

export default ViewBook;
