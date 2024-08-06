import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState("");
    const { t } = useTranslation();
    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
    };

    return (
        <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
            <div className="space-y-1 text-center">
                {selectedFile ? (
                    <>
                        <img alt="icon" src={preview} />
                        <button
                            type="button"
                            onClick={() => {
                                setPreview(null);
                                setSelectedFile(null);
                            }}
                        >
                            {t("Remove")}
                        </button>
                    </>
                ) : (
                    <>
                        <svg
                            className="mx-auto h-12 w-12 text-primary-200"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex  text-primary-200 text-xs items-center">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white p-1 rounded"
                            >
                                <span>{t("Upload a file")}</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={onSelectFile}
                                />
                            </label>
                            <p className="pl-1">{t("or drag and drop")}</p>
                        </div>
                        <p className="text-xs text-gray-100">
                            {t("image_exntensions")}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
