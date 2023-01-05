export const Modal = ({ handleCloseClick }) => {
  return (
    <div className="modal">
      <div className="modal_content">
        <p>モーダル</p>
        <button type="button" onClick={handleCloseClick}>
          閉じる
        </button>
      </div>
    </div>
  )
}