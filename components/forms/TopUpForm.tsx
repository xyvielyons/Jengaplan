import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import { MoveRight } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number is too long" })
    .regex(/^\d+$/, { message: "Only numbers are allowed" }), // Ensures only digits
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
});

const TopUpForm = ({ isOpen, onOpenChange }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      amount: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Values:", values);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2">
              <h1 className="text-[24px] font-bold text-gray-800 dark:text-gray-100">
                Top up
              </h1>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Securely top up your wallet and enjoy seamless transactions.
                Enter the amount and proceed with your preferred payment method.
              </p>
            </ModalHeader>
            <ModalBody>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Phone Number Field */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-200">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="0728***683" {...field} />
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Amount Field */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-200">Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="100"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Buttons */}
                  <div className="flex justify-end gap-2">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      className="bg-blue-600 text-white"
                      radius="sm"
                      endContent={<MoveRight />}
                    >
                      Proceed to checkout
                    </Button>
                  </div>
                </form>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TopUpForm;
