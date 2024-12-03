import {Modal} from "antd";

const MyModal = ({modalOpen, setModalOpen, children, onOk, title, className}) => {
    return (
        <Modal
            title={title}
            centered
            open={modalOpen}
            onOk={onOk}
            onCancel={() => setModalOpen(false)}
            className={className}
        >
            {children}
        </Modal>
    );
};

export default MyModal;
