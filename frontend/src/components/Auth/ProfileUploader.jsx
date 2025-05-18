

const ProfileUploader = ({ preview, onClick, onChange, fileRef }) => (
  <div className="mb-6 flex flex-col items-center">
    <div
      className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 mb-2 overflow-hidden cursor-pointer border-2 border-[#00C4A7] flex items-center justify-center relative"
      onClick={onClick}
    >
      {preview ? (
        <img src={preview} alt="Profil" className="w-full h-full object-cover" />
      ) : (
        <>
          <img src={'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg'} alt="Par défaut" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-gray-700">
            <svg className="h-6 w-6 md:h-8 md:w-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </div>
        </>
      )}
    </div>
    <input
      type="file"
      ref={fileRef}
      onChange={onChange}
      accept="image/*"
      className="hidden"
    />
    <button type="button" onClick={onClick} className="text-[#00C4A7] text-sm hover:underline">
      Télécharger une photo de profil
    </button>
  </div>
);


export default ProfileUploader;