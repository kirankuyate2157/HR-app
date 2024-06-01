import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditMail = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='dark sm:max-w-[425px] border-border'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>Edit mail 
          <Select>
            <SelectTrigger className='w-auto h-6 text-xs bg-background max-w-[100px]'>
              <SelectValue placeholder='Custom' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Custom</SelectItem>
              <SelectItem value='dark'>Selected</SelectItem>
              <SelectItem value='system'>Assesment</SelectItem>
            </SelectContent>
          </Select>
          </DialogTitle>
           
        </DialogHeader>
        <div className='flex flex-col gap-4 py-4'>
        <div className='flex flex-col  gap-4'>
            <Label htmlFor='name' className=''>
              Mail
            </Label>
            <Input
              id='name'
              disabled
              defaultValue='test@gmail.com'
            />
          </div>
          <div className='flex flex-col  gap-4'>
            <Label htmlFor='name' className=''>
              Subject
            </Label>
            <Input
              id='name'
              defaultValue='Pedro Duarte'
            />
          </div>
          <div className='flex flex-col  gap-4'>
            <Label htmlFor='body' className=''>
              Body
            </Label>
            <Textarea 
              id='body'
              placeholder="Type your message here."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMail;
