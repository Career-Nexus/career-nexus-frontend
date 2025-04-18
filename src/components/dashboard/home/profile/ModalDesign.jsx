
import { Modal, Button } from "flowbite-react";

const ReusableModal = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal dismissible show={isOpen} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">{children}</div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button type="submit" onClick={onClose} className="w-full text-white bg-[#5b9a68]">Close</Button>
        <Button type="submit" className="w-full text-white bg-[#5b9a68]">Save</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ReusableModal;