export const FormField = ({ label, name, type = "text", value, onChange, placeholder, maxLength, disabled = false, options = [], className = "" ,errors,filesDatas={}}) => {
    const isSelect = type === "select";
    const isFile = type === "file";
    
    return (
        <div className="md:flex md:items-center mb-6 flex-wrap">
            <div className="md:w-1/3 w-full mb-2 md:mb-0">
                <label className="block text-center md:text-center text-base font-medium text-black">
                    {label}:
                </label>
            </div>
            <div className="md:w-2/3 w-full">
                {isSelect ? (
                  <select
                  name={name}
                  value={value}
                  onChange={onChange}
                  className={`w-full rounded-md border ${errors[name] ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-3 text-base font-medium text-black outline-none focus:border-black focus:shadow-md ${className}`}
                  disabled={disabled}
              >
                  {options.map((option, index) => (
                      <option value={option} key={`${option}-${index}`}>
                          {option}
                      </option>
                  ))}
              </select>
              
                ) : isFile ? (
                    <>
                        <input
                            type="file"
                            name={name}
                            onChange={onChange}
                            className={`w-full rounded-md border ${errors[name] ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-3 text-base font-medium text-black outline-none focus:border-black focus:shadow-md ${className}`}
                            disabled={disabled}
                        />
                        {filesDatas[name] && (
                            <div className="flex flex-wrap items-center mt-2 gap-2">
                                {/* <p className="text-sm truncate max-w-full">{getFileName(name)}</p> */}
                                <div className="flex gap-2">
                                    <button 
                                        type="button" 
                                        onClick={() => handleViewImage(name)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                                    >
                                        View
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => handleFileDelete(name)}
                                        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        disabled={disabled}
                        className={`w-full rounded-md border ${errors[name] ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-3 text-base font-medium text-black outline-none focus:border-black focus:shadow-md ${className}`}
                    />
                )}
                {errors[name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
            </div>
        </div>
    );
};
