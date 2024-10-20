"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PropTypes from "prop-types";
import InputField from "./InputField";
import { useState } from "react";
import { ALERT_SEVERITY } from "../utils/constants";
import Alert from "./Alert";
import axios from "axios";

export const CreateBookModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedOn: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: ALERT_SEVERITY.INFO,
    message: "",
  });

  // input field change event handler
  const handleInputFieldOnChange = (event) => {
    if (!isLoading) {
      setFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };


  // save button click event listener
  const handleSaveButtonOnClick = async () => {
    if (!isLoading) {
      try {
        const newBook = {
          title: formData.title,
          author: formData.author,
          publishYear: formData.publishedOn,
        };
        setIsLoading(true);
        const resp = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/books`,
          newBook
        );
        const { data } = resp.data;
        onSubmit(data);
      } catch ({ response, message }) {
        setAlert({
          show: true,
          severity: ALERT_SEVERITY.ERROR,
          message: response?.data?.message || message,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex flex-col items-start grow">
                <DialogTitle
                  as="h2"
                  className="text-lg font-semibold leading-7 text-gray-900"
                >
                  Create book
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    Book details and information.
                  </p>
                </DialogTitle>

                {/* Alert */}
                {alert.show && (
                  <div className="flex flex-col my-3 w-full">
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

                <div className="flex flex-col mt-3 w-full border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Title
                      </dt>
                      <dd className="mt-1 sm:col-span-2 sm:mt-0">
                        <InputField
                          id="title"
                          name="title"
                          autoComplete="title"
                          value={formData.title}
                          onChange={handleInputFieldOnChange}
                        />
                      </dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Author
                      </dt>
                      <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                        <InputField
                          id="author"
                          name="author"
                          autoComplete="author"
                          value={formData.author}
                          onChange={handleInputFieldOnChange}
                        />
                      </dd>
                    </div>
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Published On
                      </dt>
                      <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                        <InputField
                          id="publishedOn"
                          name="publishedOn"
                          autoComplete="publishedOn"
                          value={formData.publishedOn}
                          onChange={handleInputFieldOnChange}
                        />
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSaveButtonOnClick}
                className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
              >
                Save
              </button>
              <button
                type="button"
                data-autofocus
                disabled={isLoading}
                onClick={() => onClose(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

// prop types definition
CreateBookModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default CreateBookModal;
