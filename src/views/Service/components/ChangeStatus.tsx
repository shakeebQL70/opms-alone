import React from "react"
import { Box, Button, Typography } from "@mui/material";
import {
    DialogBody,
    DialogHeader,
    CustomizedDialog,
} from "UI/modal";
import { RHFSelect } from "UI/select";
import { FieldInput } from "UI/input";
import { inputsType } from "UI/utils";
import { useForm } from "react-hook-form";

const ticketCurrentStatus = [
    { id: 1, label: "Process to Service Provider" },
    { id: 2, label: "Booked and Followup" },
    { id: 3, label: "Not Part of SOW" },
    { id: 4, label: "Resolved" },
]

interface IView {
    id: number,
    handleClose: Function;
}

const defaultStatus = {
    currentStatus: "",
    closeDate: "",
    statusRemarks: ""
}

const ChangeStatus = ({ id, handleClose }: IView) => {
    const {
        watch,
        control,
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<typeof defaultStatus>({
        defaultValues: defaultStatus,
        mode: "onBlur",
    });



    return (<Box>
        <CustomizedDialog open={open} handleClose={handleClose} fullWidth>
            <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>Change Status</Typography> </DialogHeader>
            <DialogBody>
                <RHFSelect
                    selectLabel="Ticket Current Status"
                    placeholder="Select Current Status"
                    control={control}
                    registerWith={`currentStatus`}
                    options={ticketCurrentStatus}
                    isRequired={true}
                />
                <FieldInput
                    type={inputsType.DATE}
                    fullWidth
                    label="close Date"
                    isError={!!errors.closeDate?.message}
                    control={control}
                    register={register}
                    helperText={errors?.closeDate?.message}
                    registerWith={"closeDate"}
                    isRequired={false}

                />

                <FieldInput
                    type={inputsType.TEXTAREA}
                    fullWidth
                    label="Status Remarks"
                    placeholder="status Remarks"
                    isError={!!errors.statusRemarks?.message}
                    control={control}
                    register={register}
                    helperText={errors?.statusRemarks?.message}
                    registerWith={"statusRemarks"}
                    isRequired={true}
                />
                <Box sx={{ gap: "15px", display: "flex" }}>
                    <Button variant="contained">Submit</Button>
                    <Button variant="contained" color="warning" onClick={() => handleClose()}>Cancel</Button>

                </Box>


            </DialogBody>
        </CustomizedDialog>
    </Box>);
}

export default ChangeStatus;