
import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useEditor } from '@/contexts/EditorContext';

type PageFormValues = {
  title: string;
  slug: string;
  description: string;
  status: 'draft' | 'published';
};

export const PageFormSidebar: React.FC = () => {
  const { isPageSidebarOpen, setIsPageSidebarOpen } = useEditor();
  
  const form = useForm<PageFormValues>({
    defaultValues: {
      title: 'Untitled Page',
      slug: 'untitled-page',
      description: '',
      status: 'draft',
    },
  });

  const onSubmit = (data: PageFormValues) => {
    console.log('Page data submitted:', data);
    // In a real app, this would save the page data
    setIsPageSidebarOpen(false);
  };

  return (
    <Sheet open={isPageSidebarOpen} onOpenChange={setIsPageSidebarOpen}>
      <SheetContent className="w-[350px] sm:w-[450px]" side="right">
        <SheetHeader>
          <SheetTitle>Page Settings</SheetTitle>
        </SheetHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter page title" {...field} />
                  </FormControl>
                  <FormDescription>
                    The title of your page as it appears to readers.
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="page-slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    The URL-friendly version of the name.
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter page description" 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Brief description for SEO and social sharing.
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="draft" id="draft" />
                        <FormLabel htmlFor="draft" className="font-normal cursor-pointer">Draft</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="published" id="published" />
                        <FormLabel htmlFor="published" className="font-normal cursor-pointer">Published</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsPageSidebarOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
