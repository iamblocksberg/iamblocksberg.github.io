
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class GetFileList {

    private static List<String> fileNameList = new ArrayList<>();
    private static List<String> fileSizeList = new ArrayList<>();
    private static long totalAllFileSize = 0;
    private static int totalFile = 0;

    public static void main(String[] args) throws IOException {

        // Get File Size
        // java.io.File file = new java.io.File("fileList.txt");
        // System.out.println("Hello World: " + file.length());

        // Get current path
        String currentPath = args[0];
        // String currentPath = "O:\\Games\\Blizzard\\Call of Duty Modern Warfare\\Data\\data";
        // String currentPath = System.getProperty("user.dir");
        // System.out.println("Working Directory = " + currentPath);

        // Get all file in folder
        final File folder = new File(currentPath);
        // search(".*\\.java", folder, fileNameList);
        search(".*", folder, fileNameList);

        System.out.println("[ Path - " + currentPath + " ]\n");

        // for (String s : fileNameList) {
        //     System.out.println(s);
        // }

        // for (int i = 0; i < fileNameList.size(); i++) {
        //     System.out.println(fileNameList.get(i) + " - " + fileSizeList.get(i) + " byte");
        // }

        System.out.println(totalFile + " files, size: " + totalAllFileSize + " byte");
        System.out.println("\n");



        // Write File
        // ref: https://www.journaldev.com/20891/java-filewriter-example
        /*
        String fileName = "fileWriter.txt";
        FileWriter fileWriter = null;
        try {
            fileWriter = new FileWriter(fileName);
            // inherited method from java.io.OutputStreamWriter
            fileWriter.write(65);
            fileWriter.write(66);
            fileWriter.write(67);
            fileWriter.write("\nHola\naaa\n\n\nbbb\nccc");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (fileWriter != null) {
                    fileWriter.flush();
                    fileWriter.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        */

        String inputFileName = args[1];
        String fileName = inputFileName + ".js";
        FileWriter fileWriter = null;
        try {
            fileWriter = new FileWriter(fileName);

            fileWriter.write("var " + inputFileName + " = [\n");
            for (int i = 0; i < fileNameList.size(); i++) {
                fileWriter.write("   {\n");
                fileWriter.write("      \"name\": \"" + fileNameList.get(i) + "\",\n");
                fileWriter.write("      \"size\": \"" + fileSizeList.get(i) + "\",\n");
                fileWriter.write("   },\n");
                // System.out.println(fileNameList.get(i) + " - " + fileSizeList.get(i) + " byte");
            }
            fileWriter.write("];");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (fileWriter != null) {
                    fileWriter.flush();
                    fileWriter.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }



        // Read File
        /*
        File file = new File(fileName);
        try {
            BufferedReader br = new BufferedReader(new FileReader(file));
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
            br.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        // Copy File
        File source = new File(fileName);
        File dest = new File("bugs2.txt");
        copyFileUsingStream(source, dest);
        */

    }

    private static void copyFileUsingStream(File source, File dest) throws IOException {
        InputStream is = null;
        OutputStream os = null;
        try {
            is = new FileInputStream(source);
            os = new FileOutputStream(dest);
            byte[] buffer = new byte[1024];
            int length;
            while ((length = is.read(buffer)) > 0) {
                os.write(buffer, 0, length);
            }
        } finally {
            is.close();
            os.close();
        }
    }

    private static float byteToGB(long numByte) {
        float result = (float) numByte / 1024;
        System.out.print(result);
        System.out.print(" ");

        result = result / 1024;
        System.out.print(result);
        System.out.print(" ");

        result = result / 1024;
        System.out.print(result);
        System.out.print("\n");
        return result;
    }

    public static void search(final String pattern, final File folder, List<String> result) {
        // ref: https://www.mkyong.com/java/java-how-to-list-all-files-in-a-directory/
        for (final File f : folder.listFiles()) {

            if (f.isDirectory()) {
                search(pattern, f, result);
            }

            if (f.isFile()) {
                if (f.getName().matches(pattern)) {
                    // long diskFreeSpace = byteToGB(f.getFreeSpace());
                    // long diskTotalSpace = byteToGB(f.getTotalSpace());
                    // long diskUsableSpace = byteToGB(f.getUsableSpace());
                    // String filePath = f.getAbsolutePath();
                    String fileName = f.getName();
                    long fileSize = f.length();

                    fileSizeList.add(fileSize + "");
                    totalAllFileSize += fileSize;
                    totalFile++;

                    result.add(fileName);
                }
            }

        }
    }

}